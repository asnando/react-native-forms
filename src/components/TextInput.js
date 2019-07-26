import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from './TextInput.styles';
import { FormField, FormFieldLabel } from  './FormField';

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
    const { value } = this.state;
    return required ? !!value.trim() : true;
  }

  handleChangeText(value) {
    return this.setState({ value });
  }

  render() {
    const { props } = this;
    const {
      title,
    } = props;
    return (
      <FormField>
        <FormFieldLabel>
          {title}
        </FormFieldLabel>
        <TextInput
          {...props}
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
