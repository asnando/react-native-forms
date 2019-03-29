import React, { Component } from 'react';
import { TextInput, View, StyleSheet, } from 'react-native';
import maskTypes from '../constants/maskTypes';
import validators from '../constants/validators';
import FormTopLabel from '../components/TopLabel';
import FormClearButton from '../components/ClearButton';

const initialState = {
  value: null,
  mask: null,
  rawMask: null,
  validator: null,
  cursorSelection: {
    start: -1,
    end: -1
  },
  maxLength: null,
  isFocused: false
};

export default class FormTextInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      validator:    this._resolveValidator(),
      keyboardType: this._resolveKeyboardType(),
      maxLength:    this.props.max || null,
      mask:         this._resolveMask(),
      rawMask:      this._resolveRawMask(),
      value:        this._getInitialValue()
    };
  }

  _resolveMask() {
    let resolvedMask = this._resolveRawMask();
    return !resolvedMask ? null : resolvedMask.replace(/[A-Za-z0-9]\?/g, '');
  }

  _resolveRawMask() {
    if (this.props.mask) {
      return /\W/.test(this.props.mask) ? this.props.mask : maskTypes[this.props.mask];
    }
    switch (this.props.type) {
      case 'phone':
        return maskTypes.phone;
      case 'cpf':
        return maskTypes.cpf;
      case 'cnpj':
        return maskTypes.cnpj;
    };
  }

  _resolveKeyboardType() {
    if (this.props.keyboard) return this.props.keyboard;
    switch (this.props.type) {
      case 'email':
        return 'email-address';
      case 'phone':
        return 'phone-pad';
      case 'cpf':
        return 'number-pad';
      case 'cnpj':
        return 'number-pad';
      default:
        return 'default';
    };
  }

  _resolveValidator() {
    if (typeof this.props.validator === 'function') {
      return this.props.validator;
    }
    switch (this.props.type) {
      case 'email':
        return validators.email;
      case 'phone':
        return validators.phone;
      case 'cpf':
        return validators.cpf;
      case 'cnpj':
        return validators.cnpj;
    };
  }

  _resolveStyle(className) {
    switch (className) {
      case 'valid':
        return this.props.validStyle;
      case 'invalid':
        return this.props.invalidStyle;
    };
  }

  _getInitialValue() {

    // If state already have state value means that form is trying to forced clear
    // this input value, so the defaultValue must be null.
    let defaultValue = (this.state && this.state.value) ? null : this.props.value;

    if (defaultValue && typeof defaultValue !== 'string') {
      defaultValue = defaultValue.toString();
    }

    if (!this._hasMask()) return defaultValue || '';

    const maskWithoutValues = this._resolveMask().replace(/[A-Za-z0-9]/g, '_');
    return !defaultValue ? maskWithoutValues
      : this._replaceMaskPositionsWithValues(maskWithoutValues, defaultValue);
  }

  _getUnmaskedValue() {
    return !this.state.value ? '' : this.state.value.replace(/[\W_]/g, '');
  }

  getValue() {
    return this._hasMask() ? this._getUnmaskedValue() : this.state.value;
  }

  // Will be called on submit actions to check if field value is valid or not.
  isValid() {
    return !this.props.required
      ? true
      : !!this._hasValidator()
        ? this.state.validator(this.getValue())
        : !!this.getValue();
  }

  componentDidUpdate() {
    setTimeout(this._updateCursor.bind(this), 0);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.value !== nextState.value) ||
      (this.state.isFocused !== nextState.isFocused);
  }

  // Resolves the real value of the field when it have mask.
  _onChangeText(value) {
    return this._hasMask() ? this._updateMaskedValue(value) : this._updateValue(value);
  }

  // Updates the focus state and calls the parent's method to update
  // the focused field in the fields list. Always updates the cursor for
  // fields with mask.
  _onFocus() {
    this._addUnusedMaskSpaces();
    this.setState({
      isFocused: true
    });
    if (typeof this.props.onFieldEnter === 'function') {
      this.props.onFieldEnter(this.props.name);
    }
    if (this._hasMask()) this._updateCursor();
  }

  // Updates the focus state.
  _onBlur() {
    this._onFieldLeaves();
  }

  // When user leaves the field focus, this component will fire the parent's
  // method "nextField" that will focus the next field in the form fields list.
  _onSubmitEditing() {
    this._onFieldLeaves();
    if (typeof this.props.nextField === 'function') {
      this.props.nextField();
    }
  }

  _onFieldLeaves() {
    this._removeUnusedMaskSpaces();
    this.setState({ isFocused: false });
  }

  // Saves the input cursor position.
  _onSelectionChange({ nativeEvent: {selection} }) {
    const prevSelection = this.state.cursorSelection;
    if ((prevSelection.start === selection.start) && (prevSelection.end === selection.end)) {
      return;
    }
    this.setState({
      ...this.state,
      cursorSelection: selection
    });
  }

  _hasMask() {
    return !!this._resolveMask();
  }

  _hasValidator() {
    return !!this.state.validator;
  }

  _hasFocus() {
    return !!this.state.isFocused;
  }

  _hasValue() {
    return !!this.getValue().length;
  }

  // Will be called by the parent (form) control system when this
  // field is the next in the tabulation.
  focus() {
    return this.input.focus();
  }

  // This function will be called by the parent (form) when the user
  // hits the clear button inside this input or the general one.
  clearValue() {
    return this.setState({
      ...this.state,
      value: this._getInitialValue()
    });
  }

  _updateMaskedValue(value) {
    return this.setState({
      ...this.state,
      value: this._resolveMaskedValue(this.state.mask, value, this.state.value)
    });
  }

  // Change the field's value for inputs without mask.
  _updateValue(value) {
    return this.setState({
      ...this.state,
      value
    });
  }

  // Add opcional mask underscores. Used when field receives focus.
  _addUnusedMaskSpaces() {
    if (!this._hasMask()) return;
    let { rawMask, value } = this.state;
    if (rawMask && /\?/.test(rawMask) && !/_/.test(value)) {
      this.setState({
        value: this._replaceMaskPositionsWithValues(
          rawMask.replace(/\?/g, ''),
          value.replace(/\W/g, '')
        )
      });
    }
  }

  // Remove opcional mask underscore that were not used.
  _removeUnusedMaskSpaces() {
    if (!this._hasMask()) return;
    let { mask, rawMask, value } = this.state;
    if (rawMask && /\?/.test(rawMask) && /_/.test(value)) {
      this.setState({
        value: this._replaceMaskPositionsWithValues(mask, value.replace(/\W/g, ''))
      });
    }
  }

  // Resolves and return the input's field exact value based on the raw mask,
  // actual and previous value.
  _resolveMaskedValue(mask, value, prevValue) {
    try {

      const {cursorSelection} = this.state;

      function getRawLength(value) {
        return /[A-Za-z0-9]/.test(value) ? value.match(/[A-Za-z0-9]/g).length : 0;
      }

      // Optional characters in mask
      if (this.state.rawMask && /\?/.test(this.state.rawMask)) {
        if ((getRawLength(value) > getRawLength(mask) - 1)) {
          mask = this.state.rawMask.replace(/\?/g, '');
        } else if (getRawLength(value) == getRawLength(mask) - 1) {
          value = value.replace(new RegExp(`_{${this.state.rawMask.match(/\?/).length}}`), '');
        }
      }

      // Reached the maximun size
      if (getRawLength(value) > getRawLength(mask)) {
        return prevValue;
      }

      // If next value is shorter than the last one means that one char was deleted.
      if ((value.length - prevValue.length) === -1) {
        // Detech which character was removed.
        let deletedIndex = -1;
        for (let index = 0; index < prevValue.length; index++) {
          if (value.charAt(index) != prevValue.charAt(index)) {
            deletedIndex = index;
            break;
          }
        }
        // Could not detect what changed.
        if (deletedIndex === -1) return value;
        // If deleted character is a non value then erase the last valid value before
        // the position and reallocate the cursor.
        if (/[\W\_]/.test(prevValue.charAt(deletedIndex))) {
          for (let index = deletedIndex - 1; index >= 0; index--) {
            if (/[A-Za-z0-9]/.test(prevValue.charAt(index))) {
              prevValue = prevValue.substring(0, index).concat('_').concat(prevValue.substring(index + 1, prevValue.length));
              break;
            }
          }
          return prevValue;
        }
        return value.substring(0, deletedIndex) + '_' + value.substring(deletedIndex, value.length);
      }

      // When user paste the value with the same size of the mask.
      if (/[A-Za-z0-9]/.test(value)) {
        if (value.match(/[A-Za-z0-9]/g).length === mask.match(/[A-Za-z0-9]/g).length) {
          value = value.replace(/(\W)|(_)/g, '');
        }
      }

      // When user paste some value with more than 1 char.
      if (value.length - mask.length >= 2) {
        value = (function(value, char, size, startsAt = -1) {
          let matches = 0;
          return value.split('').filter((valueChar, index) => {
            if (valueChar === char) {
              if (matches < size) {
                if (startsAt >= 0 && index < startsAt) return true;
                matches++; return false;
              }
              return true;
            }
            return true;
          }).join('');
        })(value, '_', (value.length - mask.length), cursorSelection.start);
      } else if (/[A-Za-z0-9]\_.*[A-Za-z0-9]/.test(value)) {
        value = value.replace(/([A-Za-z0-9])\_/, '$1');
      }

      // Remove all special characters. Remains only characters and spaces.
      value = value.replace(/\W/g, '');
      return this._replaceMaskPositionsWithValues(mask, value);
    } catch (exception) {
      console.log(exception);
      return prevValue;
    }
  }

  // This function distributes each character of the raw value inside
  // the respective underscore of the mask respecting the spaces from the
  // user input.
  _replaceMaskPositionsWithValues(mask, value) {
    let valueIndex = 0;
    return mask.split('').map(char => {
      if (/\W/.test(char)) return char;
      valueIndex++;
      if ((value.charAt(valueIndex - 1) === '') || 
      (/\d/.test(char) && !/\d/.test(value.charAt(valueIndex - 1))) ||
      (/[A-Za-z]/.test(char) && !/[A-Za-z]/.test(value.charAt(valueIndex - 1)))) return '_';
      return value.charAt(valueIndex - 1);
    }).join('');
  }

  // Natively changes the cursor position of the field.
  _updateCursor() {

    if (!this.state.value) return;

    const { value } = this.state;

    let selectionStart;

    if (/_/.test(value)) {
      selectionStart = value.indexOf('_');
    } else {
      selectionStart = value.length;
    }

    const selectionEnd = selectionStart;

    return this.input.setNativeProps({
      selection: {
        start: selectionStart,
        end: selectionEnd
      }
    });
  }

  render() {
    return (
      <View style={styles.textInputWrapper}>
        <FormTopLabel
          ref={(ref) => this.label = ref}
          label={this.props.title} />
        <TextInput
          style={styles.textInput}
          ref={(ref) => this.input = ref}
          value={this.state.value}
          maxLength={this.state.maxLength}
          secureTextEntry={this.props.secureTextEntry}
          placeholder={this.props.placeholder}
          onChangeText={this._onChangeText.bind(this)}
          onSelectionChange={this._onSelectionChange.bind(this)}
          onFocus={this._onFocus.bind(this)}
          onBlur={this._onBlur.bind(this)}
          onSubmitEditing={this._onSubmitEditing.bind(this)}
          blurOnSubmit={this.props.blurOnSubmit}
          keyboardType={this.state.keyboardType} />
        <FormClearButton onClear={this.clearValue.bind(this)} value={this._hasValue()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInputWrapper: {
    width: 300,
    height: 80,
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    fontSize: 20,
    flex: 1
  },
});