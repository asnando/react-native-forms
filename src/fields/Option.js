import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import {
  OptionContainer,
  OptionValueContainer,
  OptionValueLabel,
  optionLabelStyle,
} from './Option.styles';
import { IconArrowRight } from './modal/ModalOptionsIcons';
import ModalOptions from './modal/ModalOptions';
import FormTopLabel from '../components/TopLabel';
import FormClearButton from '../components/ClearButton';

const REQUEST_INTERVAL = 1000;
const INPUT_INTERVAL = 300;

const initialState = {
  value: null,
  optionsProvider: null,
  options: [],
  showModal: false,
  loading: true,
  page: 1,
  hasNextPage: true,
  pageSize: 0,
  inputName: null,
  filterObject: {},
  inputValue: '',
  showFilterInput: false,
};

export default class FormOption extends Component {
  constructor(props) {
    super(props);
    const { options } = props;
    const haveOptionsAsObject = options && typeof options === 'object';
    const haveOptionsAsArray = options && Array.isArray(options);
    this.state = {
      ...initialState,
      optionsProvider: (haveOptionsAsObject && typeof options.resolver === 'function') ? options.resolver : null,
      options: haveOptionsAsArray ? options : initialState.options,
      pageSize: haveOptionsAsObject ? (options.pageSize || 0) : initialState.pageSize,
      inputName: haveOptionsAsObject ? options.inputName : null,
      // filterObject: haveOptionsAsObject ? options.filter : initialState.filterObject,
    };
    const { optionsProvider } = this.state;
    if (typeof optionsProvider === 'function') {
      this.state.showFilterInput = true;
    }
    // Create a timeout to wait user input editing.
    // Only after full edit it dispatch a request to
    // the options provider.
    this.editing = null;
  }

  onShow() {
    const { onFieldEnter, name } = this.props;
    const { page } = this.state;
    // Tells the form controller that user entered the modal.
    if (typeof onFieldEnter === 'function') {
      onFieldEnter(name);
    }
    // #
    this.setLoadingStatus(true, () => {
      this.getOptionsFromProvider({ page }).then((options) => {
        this.setOptions(options, () => {
          this.setLoadingStatus(false);
        });
      });
    });
  }

  onNextPage() {
    const {
      optionsProvider,
      loading,
      hasNextPage,
    } = this.state;
    if (typeof optionsProvider !== 'function') return;
    // Abort if any transaction is already in execution or if
    // there is no more pages of options to load.
    if (loading || !hasNextPage) return;
    this.setLoadingStatus(true, () => {
      // Wait a little bit before loading data.
      setTimeout(() => {
        const { page } = this.state;
        this.getOptionsFromProvider({
          page: page + 1,
        }).then((options) => {
          this.addOptions(options, () => {
            // eslint-disable-next-line no-shadow
            const { page } = this.state;
            this.setState({ page: page + 1 }, () => {
              this.setLoadingStatus(false);
            });
          });
        });
      }, REQUEST_INTERVAL);
    });
  }

  onInputValue(value) {
    if (this.editing) {
      clearTimeout(this.editing);
    }
    // eslint-disable-next-line no-shadow
    function onSubmitEditingEnd(value) {
      this.setLoadingStatus(true, () => {
        this.setState({
          // Resets the page
          page: initialState.page,
          // Resets the options list
          options: initialState.options,
          // Set the new received value
          inputValue: value,
        }, () => {
          this.getOptionsFromProvider({
            text: value,
          }).then((options) => {
            this.setOptions(options, () => {
              this.setLoadingStatus(false);
            });
          });
        });
      });
    }
    this.editing = setTimeout(onSubmitEditingEnd.bind(this, value), INPUT_INTERVAL);
  }

  onOptionSelected(value) {
    const { nextField } = this.props;
    // Call next field on form (from parent).
    if (typeof nextField === 'function') {
      nextField();
    }
    this.setState({ value }, this.hide.bind(this));
  }

  getValue() {
    const { value } = this.state;
    return value;
  }

  getLabelValue() {
    const { value } = this.state;
    if (value === null) return '';
    switch (typeof value) {
      case 'undefined':
        return '';
      case 'string':
        return value;
      default:
        return value.toString();
    }
  }

  setLoadingStatus(status, callback) {
    this.setState({ loading: status }, callback);
  }

  setOptions(options, callback) {
    this.setState({ options }, callback);
  }

  getResumedFormValue() {
    const { getResumedFormValue } = this.props;
    return getResumedFormValue();
  }

  getOptionsFromProvider(opts = {}) {
    return (() => {
      const { optionsProvider } = this.state;
      return new Promise((resolve, reject) => {
        if (!optionsProvider) {
          const { options } = this.state;
          return resolve(options);
        }
        const providerResponse = optionsProvider(
          this.createOptionsObject(opts),
          this.createExtraOptionsObject(opts),
        );
        if (providerResponse instanceof Promise) {
          return providerResponse.then(resolve).catch(reject);
        }
        return resolve(providerResponse);
      });
    })().then(options => new Promise((resolve) => {
      const { pageSize } = this.state;
      this.setState({
        hasNextPage: (options.length >= pageSize),
      }, () => resolve(options));
    }));
  }

  createExtraOptionsObject(opts = {}) {
    const { pageSize, page } = this.state;
    return {
      size: pageSize,
      page: opts.page || page,
    };
  }

  addOptions(options, callback) {
    const { options: stateOptions } = this.state;
    this.setState({
      options: [
        ...stateOptions,
        ...options,
      ],
    }, callback);
  }

  createOptionsObject() {
    const { inputName, inputValue } = this.state;
    const resumedFormValue = this.getResumedFormValue();
    const inputObject = {
      ...resumedFormValue,
      [inputName]: inputValue,
    };
    return inputObject;
  }

  clearValue() {
    return this.setState({ value: null });
  }

  isValid() {
    return !!this.getValue();
  }

  show() {
    this.setState({
      showModal: true,
      loading: true,
    });
  }

  hide() {
    const {
      optionsProvider,
      options,
      filter: filterObject,
      inputName,
    } = this.state;
    // Remove value from filters object that refers to this options.
    if (typeof filterObject === 'object' && !!inputName) {
      delete filterObject[inputName];
    }
    this.setState({
      showModal: false,
      page: initialState.page,
      // Do not erase options when there is not options provider function
      // to fetch the data again (if user reopens the modal).
      options: (typeof optionsProvider === 'function') ? [] : options,
      // filterObject,
    });
  }

  render() {
    const {
      showFilterInput,
      showModal,
      options,
      loading,
    } = this.state;
    const {
      title,
    } = this.props;
    return (
      <View>
        <ModalOptions
          showFilterInput={showFilterInput}
          showModal={showModal}
          hideModal={(...args) => this.hide(...args)}
          onShow={(...args) => this.onShow(...args)}
          onOptionSelected={(...args) => this.onOptionSelected(...args)}
          onNextPage={(...args) => this.onNextPage(...args)}
          onInputValue={(...args) => this.onInputValue(...args)}
          options={options}
          title={title}
          loading={loading}
        />
        <OptionContainer onPress={(...args) => this.show(...args)}>
          <FormTopLabel style={optionLabelStyle} label={title} />
          <OptionValueContainer>
            <OptionValueLabel>
              {this.getLabelValue()}
            </OptionValueLabel>
            <IconArrowRight value={this.getLabelValue()} />
            <FormClearButton onClear={(...args) => this.clearValue(...args)} value={this.getLabelValue()} />
          </OptionValueContainer>
        </OptionContainer>
      </View>
    );
  }
}

FormOption.defaultProps = {
  options: [],
  title: '',
  nextField: null,
  onFieldEnter: null,
};

FormOption.propTypes = {
  options: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  nextField: PropTypes.func,
  getResumedFormValue: PropTypes.func.isRequired,
  onFieldEnter: PropTypes.func,
};
