import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from './TextInput.styles';
import { FormField, FormFieldLabel } from './FormField.styles';
import resolveValidatorFromList from '../../validators/helpers/resolveValidatorFromList';

const initialState = {
  value: '',
  validator: null,
  isVisible: true,
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

  saveTextInputRef(ref) {
    this.textInput = ref;
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

  // When a transition occurs inside the form step the FormView
  // field will be notified that it got active so dynamic TextInput
  // can be hided or showed as needed.
  fieldGotActive(formData) {
    const { show } = this.props;
    if (typeof show === 'function') {
      const isVisible = show(formData);
      // Even if the field must not be rendered we clean any
      // previous inputed value.
      if (!isVisible) this.clear();
      return this.setState({
        isVisible,
      });
    }
    return true;
  }

  clear() {
    return this.setState({
      value: initialState.value,
    });
  }

  validate() {
    const { required } = this.props;
    const { value, validator, isVisible } = this.state;
    if (required && isVisible) {
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

  focus() {
    const { textInput } = this;
    return textInput.focus();
  }

  handleSubmitEditing() {
    const { onFormFieldSubmitEditing } = this.props;
    onFormFieldSubmitEditing(this);
  }

  render() {
    const { props } = this;
    const { title } = props;
    const { value, isVisible } = this.state;
    return isVisible && (
      <FormField>
        <FormFieldLabel>
          {title}
        </FormFieldLabel>
        <TextInput
          {...props}
          ref={(...args) => this.saveTextInputRef(...args)}
          value={value}
          onChangeText={(...args) => this.handleChangeText(...args)}
          onSubmitEditing={(...args) => this.handleSubmitEditing(...args)}
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
  show: null,
  onFormFieldSubmitEditing: null,
};

FormTextInput.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  saveFormFieldRef: PropTypes.func,
  validator: PropTypes.string,
  show: PropTypes.func,
  onFormFieldSubmitEditing: PropTypes.func,
};

export default FormTextInput;
