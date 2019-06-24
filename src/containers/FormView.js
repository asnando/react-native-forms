/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-return-assign */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { View, KeyboardAvoidingView, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import FormButton from '../components/Button';
import FormTextInput from '../fields/TextInput';
import FormSwitch from '../fields/Switch';
import FormOption from '../fields/Option';
import FormRadio from '../fields/Radio';
import { formViewContainerStyle } from './FormView.styles';

const initialState = {
  fields: {},
  activeField: null,
};

class FormView extends Component {
  constructor(props) {
    super(props);
    this.fields = {};
    this.state = initialState;
  }

  getValue() {
    return this._resolveFormValues();
  }

  // Returns the configuration of the first invalid field in the form.
  whatIsInvalid() {
    const { fields } = this.props;
    const invalidFieldName = fields
      .filter(field => !!field.required)
      .map(field => this.fields[field.name])
      .find(field => !field.isValid())
      .props
      .name;
    return fields.find(field => field.name === invalidFieldName);
  }

  // Called from FormButton with "submit" type or parent submit action.
  submit() {
    const { onInvalid, onSubmit } = this.props;
    if (!this.isValid()) {
      if (typeof onInvalid === 'function') {
        onInvalid(this.whatIsInvalid());
      } else {
        // Change the color of field which is invalid.
        const field = this.whatIsInvalid();
        this._getFieldComponentReferenceByName(field.name).highlightInvalid();
      }
      return false;
    }
    if (typeof onSubmit === 'function') {
      onSubmit(this._resolveFormValues());
    }
    return true;
  }

  isValid() {
    const { fields } = this.props;
    return !(fields || [])
      .filter(field => !!field.required)
      .map(field => this.fields[field.name])
      .filter(field => (typeof field.isValid === 'function' ? !field.isValid() : false))
      .length;
  }

  // Calls the "clearValue" method of each form field.
  _clearForm() {
    const { fields } = this;
    Object.keys(fields).forEach((fieldName) => {
      if (typeof fields[fieldName].clearValue === 'function') {
        fields[fieldName].clearValue();
      }
    });
  }

  _resolveFormValues() {
    const form = {};
    const { fields } = this.props;
    Object.keys(this.fields).forEach((fieldName) => {
      // Reference to the registered component reference.
      const field = fields[fieldName];
      // Get original configuration of the field.
      const fieldConfiguration = fields.find(f => f.name === fieldName);
      // Resolve alias name for the form value object.
      const resolvedFieldKey = fieldConfiguration.as || fieldName;
      // Use the "getValue" method of the field component. If
      // undefined or not a function just ignore.
      if (!field || typeof field.getValue !== 'function') return;
      // Get the field value from inside the component.
      let fieldValue = field.getValue();
      // In some cases the field value must be resolved before
      // it is set in the form object. If this resolver function
      // exists, call it.
      if (typeof fieldConfiguration.resolve === 'function') {
        fieldValue = fieldConfiguration.resolve(fieldValue);
      }
      // Set the value (only if not empty).
      // eslint-disable-next-line no-restricted-globals
      if ((fieldValue || !isNaN(fieldValue)) && !/^$/.test(fieldValue)) {
        form[resolvedFieldKey] = fieldValue;
      }
    });
    return form;
  }

  _getFieldComponentReferenceByName(name) {
    return this.fields[name];
  }

  // Called from FormButton with "clear" type or parent clear action.
  clear() {
    const { onClear } = this.props;
    this._clearForm();
    if (typeof onClear === 'function') {
      onClear();
    }
  }

  // Save the focused field by it name. It is used to control
  // the tabulation of the form.
  _onFieldEnter(name) {
    this.setState(prevState => ({
      ...prevState,
      activeField: name,
    }));
  }

  // Called when some input field got blured inside the form, so the
  // form control system will call the next field focus (if exists).
  _onNextField() {
    const { fields } = this;
    const { activeField } = this.state;
    const nextField = Object.keys(fields).filter((field, index, self) => {
      return self.indexOf(activeField) + 1 === index;
    }).map(fieldName => fields[fieldName]).pop();
    if (nextField) {
      if (typeof nextField.focus === 'function') {
        nextField.focus();
      } else if (typeof nextField.show === 'function') {
        nextField.show();
      }
    } else {
      Keyboard.dismiss();
    }
  }

  _renderFields() {
    const { fields, validStyle, invalidStyle } = this.props;

    return (fields || []).map((field, fieldKey, self) => {
      // Set boolean if keyboard should close after user
      // leave the field. Otherwise the keyboard will be left open.
      const blurOnSubmit = (() => fieldKey === (self.filter(f => /(text|password|email|phone|cpf|cnpj|undefined)/.test(f.type)).length - 1))();
      // If field dont have styles for valid/invalid action,
      // assume the generic form style.
      field.validStyle = field.validStyle || validStyle;
      field.invalidStyle = field.invalidStyle || invalidStyle;

      switch (field.type) {
        case 'submit':
          field.onPress = this.submit.bind(this);
          break;
        case 'clear':
          field.onPress = this.clear.bind(this);
          break;
        case 'text':
        case 'password':
        case 'email':
        case 'phone':
        case 'cpf':
        case 'cnpj':
        default:
          field.nextField = this._onNextField.bind(this);
          field.onFieldEnter = this._onFieldEnter.bind(this);
          field.blurOnSubmit = blurOnSubmit;
          break;
      }

      switch (field.type) {
        case 'button':
        case 'clear':
        case 'submit':
          return <FormButton key={fieldKey} {...field} />;
        case 'radio':
          return (
            <FormRadio ref={r => this.fields[field.name] = r} key={fieldKey} {...field} />
          );
        case 'text':
        case 'password':
        case 'email':
        case 'phone':
        case 'cpf':
        case 'cnpj':
        default:
          return (
            <FormTextInput
              ref={r => this.fields[field.name] = r}
              key={fieldKey}
              secureTextEntry={field.type === 'password'}
              {...field} />
          );
        case 'boolean':
          return (
            <FormSwitch ref={r => this.fields[field.name] = r} key={fieldKey} {...field} />
          );
        case 'option':
          return (
            <FormOption ref={r => this.fields[field.name] = r} key={fieldKey} {...field} />
          );
      }
    });
  }

  render() {
    return (
      <View style={formViewContainerStyle} behavior="padding" enabled>
        {this._renderFields()}
      </View>
    );
  }
}

const noop = () => {};

FormView.defaultProps = {
  fields: [],
  onInvalid: noop,
  onSubmit: noop,
  onClear: noop,
  validStyle: null,
  invalidStyle: null,
};

FormView.propTypes = {
  fields: PropTypes.array,
  onInvalid: PropTypes.func,
  onSubmit: PropTypes.func,
  onClear: PropTypes.func,
  validStyle: PropTypes.object,
  invalidStyle: PropTypes.object,
};

export default FormView;
