import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from './TextInput.styles';
import { FormField, FormFieldLabel } from  './FormField';

class FormTextInput extends PureComponent {
  render() {
    const { title } = this.props;
    return (
      <FormField>
        <FormFieldLabel>
          {title}
        </FormFieldLabel>
        <TextInput />
      </FormField>
    );
  }
}

FormTextInput.defaultProps = {
  title: null,
};

FormTextInput.propTypes = {
  title: PropTypes.string,
};

export default FormTextInput;
