import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import FormButton from '../components/Button';
import FormTextInput from '../fields/TextInput';
import FormSwitch from '../fields/Switch';
import FormOption from '../fields/Option';

const initialState = {
  fields: {},
  activeField: null
};

export default class FormView extends Component {

  constructor(props) {
    super(props);
    this.fields = {};
    this.state = initialState;
  }

  _resolveFormValues() {
    let form = {};
    const { fields } = this;
    Object.keys(fields).forEach(fieldName => {
      let field = fields[fieldName];
      if (!field || typeof field.getValue !== 'function') return;
      form[fieldName] = field.getValue();
    });
    return form;
  }

  // Calls the "clearValue" method of each form field.
  _clearForm() {
    const { fields } = this;
    Object.keys(fields).forEach(fieldName => {
      if (typeof fields[fieldName].clearValue === 'function') {
        fields[fieldName].clearValue();
      }
    });
  }

  isValid() {
    return !this.props.fields
      .filter(field => !!field.required)
      .map(field => this.fields[field.name])
      .filter(field => !field.isValid())
      .length;
  }

  // Returns the configuration of the first invalid field in the form.
  whatIsInvalid() {
    const invalidFieldName = this.props.fields
      .filter(field => !!field.required)
      .map(field => this.fields[field.name])
      .find(field => !field.isValid())
      .props
      .name;
    return this.props.fields.find(field => field.name === invalidFieldName);
  }

  // Called from FormButton with "submit" type or parent submit action.
  submit() {
    if (!this.isValid()) {
      if (typeof this.props.onInvalid === 'function') {
        this.props.onInvalid(this.whatIsInvalid());
      }
      return false;
    }
    if (typeof this.props.onSubmit === 'function') {
      this.props.onSubmit(this._resolveFormValues());
    }
  }

  // Called from FormButton with "clear" type or parent clear action.
  clear() {
    this._clearForm();
    if (typeof this.props.onClear === 'function') {
      this.props.onClear();
    }
  }

  // Save the focused field by it name. It is used to control
  // the tabulation of the form.
  _onFieldEnter(name) {
    this.setState({
      ...this.state,
      activeField: name
    });
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
    }
  }

  _renderFields() {
    return (this.props.fields || []).map((field, fieldKey) => {

      // If field dont have styles for valid/invalid action, assume the general form style.
      field.validStyle = field.validStyle || this.props.validStyle;
      field.invalidStyle = field.invalidStyle || this.props.invalidStyle;

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
          break;
      };

      switch (field.type) {
        case 'button':
        case 'clear':
        case 'submit':
          return <FormButton key={fieldKey} {...field} />;
        case 'text':
        case 'password':
        case 'email':
        case 'phone':
        case 'cpf':
        case 'cnpj':
        default:
          return <FormTextInput
            ref={(r) => this.fields[field.name] = r}
            key={fieldKey}
            secureTextEntry={field.type === 'password'}
            {...field} />
        case 'boolean':
          return <FormSwitch
            ref={(r) => this.fields[field.name] = r}
            key={fieldKey}
            {...field} />;
        case 'option':
          return <FormOption
            ref={(r) => this.fields[field.name] = r}
            key={fieldKey}
            {...field} />;
      };
    });
  }

  render() {
    return (
      <View style={styles.formView}>
        {this._renderFields()}
      </View>
    );
  }

}

const styles = StyleSheet.create({
  formView: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
    paddingBottom: 16,
  }
});