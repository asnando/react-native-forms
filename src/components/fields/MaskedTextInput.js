import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  MaskedTextInput as RNMaskedTextInput,
} from 'rn-masked-text-input';
import {
  FormField,
  FormFieldLabel,
} from './FormField.styles';

const initialState = {
  value: null,
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
    const { maskedTextInput } = this;
    return maskedTextInput.getValue();
  }

  clear() {
    console.warn('todo: implement clear action on MaskedTextInput');
  }

  saveMaskedTextInputRef(ref) {
    this.maskedTextInput = ref;
  }

  render() {
    const {
      title,
      maskType,
      customMask,
      secureTextEntry,
    } = this.props;
    return (
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
};

MaskedTextInput.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  maskType: PropTypes.string,
  customMask: PropTypes.string,
  keyboardType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  saveFormFieldRef: PropTypes.func,
};

export default MaskedTextInput;
