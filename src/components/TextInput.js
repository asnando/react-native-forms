import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from './TextInput.styles';
import { FormField, FormFieldLabel } from  './FormField';

class FormTextInput extends PureComponent {
  isValid() {
    const { name } = this.props;
    console.log(`Validating "${name}" field`);
    return true;
  }
  
  render() {
    const { props } = this;
    const {
      name,
      title,
      onFormFieldValue,
    } = props;
    return (
      <FormField>
        <FormFieldLabel>
          {title}
        </FormFieldLabel>
        <TextInput
          {...props}
          onChangeText={value => onFormFieldValue(name, value)}
        />
      </FormField>
    );
  }
}

FormTextInput.defaultProps = {
  title: null,
  onFormFieldValue: null,
};

FormTextInput.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  onFormFieldValue: PropTypes.func,
};

export default FormTextInput;
