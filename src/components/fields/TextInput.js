import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from './TextInput.styles';
import { FormField, FormFieldLabel } from './FormField.styles';
import resolveValidatorFromList from '../../validators/helpers/resolveValidatorFromList';

const initialState = {
  value: '',
  validator: null,
};

class FormTextInput extends PureComponent {
  constructor(props) {
    const { validator } = props;
    super(props);
    this.state = {
      ...initialState,
      validator: resolveValidatorFromList(validator),
    };
  }

  componentDidMount() {
    const { saveFormFieldRef } = this.props;
    saveFormFieldRef(this);
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

  clear() {
    return this.setState({
      value: initialState.value,
    });
  }

  validate() {
    const { required } = this.props;
    const { value, validator } = this.state;
    if (required) {
      if (typeof validator === 'function') {
        return validator(value);
      }
      return !!value.trim();
    }
    return true;
  }

  handleChangeText(value) {
    return this.setState({ value });
  }

  render() {
    const { props } = this;
    const { title } = props;
    const { value } = this.state;
    return (
      <FormField>
        <FormFieldLabel>
          {title}
        </FormFieldLabel>
        <TextInput
          {...props}
          value={value}
          onChangeText={(...args) => this.handleChangeText(...args)}
        />
      </FormField>
    );
  }
}

FormTextInput.defaultProps = {
  title: null,
  required: false,
  saveFormFieldRef: null,
  validator: null,
};

FormTextInput.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  saveFormFieldRef: PropTypes.func,
  validator: PropTypes.string,
};

export default FormTextInput;
