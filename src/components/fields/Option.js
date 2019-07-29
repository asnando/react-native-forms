import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  ModalSelectList,
} from 'react-native-modal-select-list';
import {
  FormField,
  FormFieldLabel,
} from './FormField.styles';
import {
  OptionInputContainer,
  OptionInputText,
  OptionInputArrowRight,
  OptionInputClearButton,
  OptionInputClearButtonText,
} from './Option.styles';

const initialState = {
  value: null,
};

class Option extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    const { saveFormFieldRef } = this.props;
    if (typeof saveFormFieldRef === 'function') {
      saveFormFieldRef(this);
    }
  }

  getName() {
    const { name } = this.props;
    return name;
  }

  getDisplayName() {
    const { title } = this.props;
    return title;
  }

  getValue() {
    const { value } = this.state;
    return value;
  }

  validate() {
    const { required } = this.props;
    if (required) {
      const { value } = this.state;
      return typeof value === 'string' && !!value.trim();
    }
    return true;
  }

  saveOptionsListRef(ref) {
    this.optionsList = ref;
  }

  showOptionsList() {
    const { optionsList } = this;
    optionsList.show();
  }

  clear() {
    return this.setState({
      value: initialState.value,
    });
  }

  handleSelectedOption(value) {
    return this.setState({ value });
  }

  render() {
    const { value } = this.state;
    const { title, options } = this.props;
    return (
      <Fragment>
        <FormField>
          <FormFieldLabel>
            {title}
          </FormFieldLabel>
          <OptionInputContainer onPress={() => this.showOptionsList()}>
            <OptionInputText>{value}</OptionInputText>
            { !value && (
              <OptionInputArrowRight>
                {">"}
              </OptionInputArrowRight>
            )}
            { value && (
              <OptionInputClearButton onPress={() => this.clear()}>
                <OptionInputClearButtonText>x</OptionInputClearButtonText>
              </OptionInputClearButton>
            )}
          </OptionInputContainer>
        </FormField>
        <ModalSelectList
          ref={(...args) => this.saveOptionsListRef(...args)}
          closeButtonText="Close"
          options={options}
          onSelectedOption={(...args) => this.handleSelectedOption(...args)}
          disableTextSearch
        />
      </Fragment>
    );
  }
}

Option.defaultProps = {
  title: null,
  required: false,
  options: [],
  saveFormFieldRef: null,
};

Option.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  required: PropTypes.bool,
  // See "react-native-modal-select-list" options reference.
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
  saveFormFieldRef: PropTypes.func,
};

export default Option;
