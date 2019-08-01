import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  MaskedTextInput as RNMaskedTextInput,
} from 'rn-masked-text-input';
import {
  FormField,
  FormFieldLabel,
} from './FormField.styles';
import resolveValidatorFromList from '../../validators/helpers/resolveValidatorFromList';

const initialState = {
  value: null,
  validator: null,
  isVisible: true,
};

const resolveKeyboardTypeFromMask = (maskType) => {
  switch (maskType) {
    case 'cpf':
    case 'cnpj':
    case 'date':
    case 'phone':
      return 'numeric';
    default:
      return null;
  }
};

class MaskedTextInput extends PureComponent {
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
    const { maskedTextInput } = this;
    if (!maskedTextInput) {
      return initialState.value;
    }
    return maskedTextInput.getValue();
  }

  validate() {
    const { required } = this.props;
    const { isVisible, validator } = this.state;
    const value = this.getValue();
    if (required && isVisible) {
      if (typeof validator === 'function') {
        return validator(value);
      }
      return !!value.trim();
    }
    return true;
  }

  clear() {
    const { maskedTextInput } = this;
    if (maskedTextInput) {
      maskedTextInput.clear();
    }
  }

  saveMaskedTextInputRef(ref) {
    this.maskedTextInput = ref;
  }

  // When a transition occurs inside the form step the FormView
  // field will be notified that it got active so dynamic
  // MaskedTextInput can be hided or showed as needed.
  fieldGotActive(formData) {
    const { show } = this.props;
    if (typeof show === 'function') {
      const isVisible = show(formData);
      if (!isVisible) this.clear();
      return this.setState({
        isVisible,
      });
    }
    return true;
  }

  handleSubmitEditing() {
    const { onFormFieldSubmitEditing } = this.props;
    onFormFieldSubmitEditing(this);
  }

  focus() {
    const { maskedTextInput } = this;
    return maskedTextInput.focus();
  }

  render() {
    const { isVisible } = this.state;
    const {
      title,
      maskType,
      customMask,
      secureTextEntry,
    } = this.props;
    return isVisible && (
      <FormField>
        <FormFieldLabel>
          {title}
        </FormFieldLabel>
        <RNMaskedTextInput
          ref={(...args) => this.saveMaskedTextInputRef(...args)}
          maskType={maskType}
          customMask={customMask}
          secureTextEntry={secureTextEntry}
          keyboardType={resolveKeyboardTypeFromMask(maskType)}
          onSubmitEditing={(...args) => this.handleSubmitEditing(...args)}
        />
      </FormField>
    );
  }
}

MaskedTextInput.defaultProps = {
  title: null,
  maskType: null,
  customMask: null,
  keyboardType: null,
  secureTextEntry: null,
  saveFormFieldRef: null,
  onFormFieldSubmitEditing: null,
  required: false,
  validator: null,
  show: null,
};

MaskedTextInput.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  maskType: PropTypes.string,
  customMask: PropTypes.string,
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  saveFormFieldRef: PropTypes.func,
  onFormFieldSubmitEditing: PropTypes.func,
  required: PropTypes.bool,
  validator: PropTypes.string,
  show: PropTypes.func,
};

export default MaskedTextInput;
