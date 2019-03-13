# React Forms
📃 HOC Component that renders form with custom fields.

# Usage
```javascript
import Form from 'forms/Form';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  invalid: {
    borderColor: 'red'
  },
  valid: {
    borderColor: 'green'
  }
});

const formConfiguration = {
  // When app needs to have form inside N tabs.
  tabs: [
    // Array of fields
  ],
  // Configuration of fields that will be displayed.
  fields: [
    {
      // Unique field name. The value of this field will be
      // inside the object key with that same name on the submit event.
      name: {String},
      // Type of the field. This will differ the component used by the field,
      // the mask in some cases and the validators.
      /** Avaiable types:
       * button, text, password, email
       * phone, cpf, cnpj, boolean, option
       * submit, clear
      */
      type: {String},
      // Initial field value. If field uses mask, it will replace the underscores
      // markups with the value.
      value: {String|Number},
      // Title for the label.
      title: {String},
      // Custom placeholder string for the fields with free input type.
      placeholder: {String},
      // Use specific native keyboard type, otherwise will assume the default by the 
      // field type.
      /**
       * Avaiable types:
       * default, number-pad, decimal-pad, numeric,
       * email-address, phone-pad
       */
      keyboard: {String},
      // Custom mask. In some cases the mask is already built within the type of the field.
      mask: {String},
      // Custom validator. Validator is a function that must return boolean. It will
      // receive the input field text every time it changes.
      validator: {Function},
      // When the field type is "options" this field must receive an array
      // with the options to show, or a promise which will return these values.
      options: {Array|Promise},
      // In case where the field must navigate to any route on press event.
      navigate: {String|Object},
      // Function that will resolve the title of the label when language changes.
      translate: {Function},
      // StyleSheet for when the validator returns valid value. If none then will
      // assume the form general style.
      validStyle: {StyleSheet},
      // StyleSheet for when the validator returns invalid value. If none then will
      // assume the form general style.
      invalidStyle: {StyleSheet},
      // Maximum size of the field (when free inputs).
      max: {Integer}
    },
  ],
  validStyle: styles.valid,
  invalidStyle: styles.invalid
};

class myComponent extends Component {
  // ...
  render() {
    return <Form {...formConfiguration} />;
  }
}
```

# Methods
| Name | Description |
| ---- | ----------- |
| submit | Check if all fields in the form have valid values and fires the "onSubmit" callback within the form values as an object. If form is invalid, will fire the "onInvalid" callback. |
| clear | Manually clears all the fields in the form.

# Callbacks
| Name | Params | Description |
|------|--------|-------------|
| onSubmit | form | Called when user press the field with "submit" type. It will resolve and return the form as an object with all the fields values inside it. |
| onClear | - | Called when user press the field with "clear" type. |
| onInvalid | field | Called when the user submit the form but it have empty required fields or fields with invalid value. |

# Manual submit / clear button
```javascript
// ...
submitForm() {
  // Explicit call the submit method of the form.
  this.form.submit();
}
clearForm() {
  // Explicit call the clear method of the form.
  this.form.clear();
}
render() {
  return (
    <View>
      <Form ref={(ref) => this.form = ref}>
      <Button title="Submit" onPress={this.submitForm.bind(this)}></Button>
      <Button title="Clear" onPress={this.clearForm.bind(this)}></Button>
    </View>
  );
}
```