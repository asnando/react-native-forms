import React, { Component } from 'react';
import ModalOptions from './modal/ModalOptions';
import OptionArrow from './modal/OptionArrow';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  FormTopLabel,
  FormClearButton
} from '../';

const REQUEST_INTERVAL = 1000;
const INPUT_INTERVAL = 300;

const initialState = {
  value:           null,
  optionsProvider: null,
  options:         [],
  showModal:       false,
  loading:         true,
  page:            1,
  hasNextPage:     true,
  pageSize:        0,
  inputName:       null,
  filterObject:    {},
};

export default class FormOption extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      optionsProvider: (typeof props.options === 'object' && typeof props.options.resolver === 'function') ? props.options.resolver : null,
      options: Array.isArray(props.options) ? props.options : initialState.options,
      pageSize: typeof props.options === 'object' ? (props.options.pageSize || 0) : initialState.pageSize,
      inputName: typeof props.options === 'object' ? props.options.inputName : null,
      filterObject: typeof props.options === 'object' ? props.options.filter : initialState.filterObject
    };
    // Create a timeout to wait user input editing.
    // Only after full edit it dispatch a request to
    // the options provider.
    this.editing = null;
  }

  getValue() {
    return this.state.value;
  }

  clearValue() {
    return this.setState({ value: null });
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
    };
  }

  onShow() {
    // Tells the form controller that user entered the modal.
    if (typeof this.props.onFieldEnter === 'function') {
      this.props.onFieldEnter(this.props.name);
    }
    // #
    this.setLoadingStatus(true, () => {
      this.getOptionsFromProvider({ page: this.state.page }).then(options => {
        this.setOptions(options, () => {
          this.setLoadingStatus(false);
        });
      });
    });
  }

  setLoadingStatus(status, callback) {
    this.setState({ loading: status }, callback);
  }

  setOptions(options, callback) {
    this.setState({ options }, callback);
  }

  addOptions(options, callback) {
    this.setState({
      options: [
        ...this.state.options,
        ...options
      ]
    }, callback);
  }

  createOptionsObject(opts = {}) {
    return this.state.filterObject;
  }

  createExtraOptionsObject(opts = {}) {
    return { size: 0, page: opts.page };
  }

  getOptionsFromProvider(opts = {}) {
    return (() => {
      return new Promise((resolve, reject) => {
        if (!this.state.optionsProvider) {
          return resolve(this.state.options);
        }
        const providerResponse = this.state.optionsProvider(
          this.createOptionsObject(opts),
          this.createExtraOptionsObject(opts)
        );
        if (providerResponse instanceof Promise) {
          return providerResponse.then(resolve).catch(reject);
        } else {
          return resolve(providerResponse);
        }
      });
    })().then(options => {
      return new Promise((resolve, reject) => {
        this.setState({
          hasNextPage: (options.length >= this.state.pageSize)
        }, ()  => {
          return resolve(options);
        });
      });
    })
  }

  show() {
    this.setState({
      showModal: true,
      loading: true,
    });
  }

  hide() {
    const filterObject = this.state.filter;
    if (typeof filterObject === 'object' && !!this.state.inputName) {
      delete filterObject[this.state.inputName];
    }
    this.setState({
      showModal: false,
      options: [],
      filterObject
    });
  }

  onOptionSelected(value) {
    // Call next field on form (from parent).
    if (typeof this.props.nextField === 'function') {
      this.props.nextField();
    }
    this.setState({ value }, this.hide.bind(this));
  }

  onNextPage() {
    // Abort if any transaction is already in execution or if
    // there is no more pages of options to load.
    if (this.state.loading || !this.state.hasNextPage) {
      return;
    }
    this.setLoadingStatus(true, () => {
      // Wait a little bit before loading data.
      setTimeout(() => {
        this.getOptionsFromProvider({
          page: this.state.page + 1,
        }).then(options => {
          this.addOptions(options, () => {
            this.setState({ page: this.state.page + 1 }, () => {
              this.setLoadingStatus(false);
            });
          });
        });
      }, REQUEST_INTERVAL);
    });
  }

  onInputValue(value) {

    if (this.editing) clearTimeout(this.editing);
    this.editing = setTimeout(onSubmitEditing.bind(this), INPUT_INTERVAL);

    function onSubmitEditing() {
      this.setLoadingStatus(true, () => {
        this.setState({
          page: 1,
          options: initialState.options,
          filterObject: {
            ...this.state.filterObject,
            [this.state.inputName]: value,
          }
        }, () => {
          this.getOptionsFromProvider({ text: value }).then(options => {
            this.setOptions(options, () => {
              this.setLoadingStatus(false);
            });
          });
        });
      });
    }

  }

  render() {
    return (
      <View>
        <ModalOptions
          showModal={this.state.showModal}
          hideModal={this.hide.bind(this)}
          onShow={this.onShow.bind(this)}
          onOptionSelected={this.onOptionSelected.bind(this)}
          onNextPage={this.onNextPage.bind(this)}
          onInputValue={this.onInputValue.bind(this)}
          options={this.state.options}
          title={this.props.title}
          loading={this.state.loading} />
        <TouchableOpacity style={styles.optionWrapper} onPress={this.show.bind(this)}>
          <FormTopLabel label={this.props.title}></FormTopLabel>
          <Text>{this.getLabelValue()}</Text>
          <OptionArrow />
          <FormClearButton onClear={this.clearValue.bind(this)} value={this.getLabelValue()} />
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  optionWrapper: {
    width: 300,
    height: 75,
    marginBottom: 25,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#d5d5d5'
  },
});