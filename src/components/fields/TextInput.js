import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from './TextInput.styles';
import { FormField, FormFieldLabel } from './FormField.styles';

const initialState = {
  value: '',
};

class FormTextInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;
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
    const { value } = this.state;
    return required ? !!value.trim() : true;
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
};

FormTextInput.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  saveFormFieldRef: PropTypes.func,
};

export default FormTextInput;
