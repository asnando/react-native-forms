# React Forms
📃 HOC Component that renders form with custom fields.

# Usage
```javascript
import Form from 'forms/Form';
import { StyleSheet } from 'react-native';

class MyComponent extends React.Component {
  render() {
    return <Form {...formConfiguration} />;
  }
}
```

# Form options
This is a object which form component receives. It will include fields, their types and another configurations.

```javascript
{
  steps: [
    /* Refers to "Step" section below */
  ],
  tabs: [
    /* Refers to "Tabs" section below */
  ],
  // Configuration of fields that will be displayed.
  // Fields are rendered inside a normal form view,
  // on inside each step/tab view of the component.
  fields: [
    {
      // Unique field name. The value of this field will be
      // inside the object key with that same name on the submit event.
      name: {String},
      // Type of the field. This will differ the component used by the field,
      // the mask in some cases and the validators. Refers to "Field Types"
      // section below.
      type: {String},
      // Initial field value. If field uses mask, it will replace the underscores
      // markups with the value.
      value: {String|Number},
      // Title for the label.
      title: {String},
      // Custom placeholder string for the fields with free input type.
      placeholder: {String},
      // Use specific native keyboard type, otherwise will assume the default by the 
      // field type. Refers to the keyboard types below.
      keyboard: {String},
      // Custom mask. In some cases the mask is already built within the type of the field.
      mask: {String},
      // Custom validator. Validator is a function that must return boolean. It will
      // receive the input field text every time it changes.
      validator: {Function},
      // Refers to the "Options" section below.
      options: {Array|Object},
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
  // Valid and invalid styles are objects with style definition
  // that will be used inside invalid or valid text inputs when their
  // values changes.
  validStyle: styles.valid,
  invalidStyle: styles.invalid
};
```

## Steps
When <i>steps</i> array is defined inside form options will make the form container render a carousel like view. Each part of array must receive it respective fields. In the end of the form will be avaiable a submit button that triggers the <i>onSubmit</i> method within the merged form value inputed by the user.

| Extra Options | Description |
| ------------- | ----------- |
| title | Title message on each step ** |
| backButtonTitle | Label for back button on each step ** |
| nextStepButtonTitle | Label for next tab button on each step ** | 
| submitButtonTitle | Label for the button on the last step (which submits the form) |

** Defined inside the root object or inside each step of steps array

## Tabs
The tabs model separates multiple forms inside one instance of the form. Just as steps model the fields must be defined inside each part of array separately. In this case all forms will not be merged in the end. When the user submit a form it will only resolves the form value of the active tab.

Note.: <i>Steps and tabs uses ```react-native-tab-view``` plugin.</i>

# Additional Options
| Name | Type |
| tabTintColor | Color |
| tabIndicatorColor | Color |
| tabTextColor | Color |

## Keyboard Types
default, number-pad, decimal-pad, numeric, email-address, phone-pad

## Field Types
Some field types will have a default mask (which are managed by the form itself).

| Types | Values |
| ----- | ------ |
| Default Type | text |
| Type | text, email phone, boolean |
| Masked Type | password, cpf, cnpj |
| Button Type | button, submit, clear |
| Special Type | option, radio |

## Options
Options can receive Object or Array values.

When field is defined as "radio" type it will use the options array to set the labels and values for the rendered radio buttons. In this case the objects of array must follow this tye:
```javascript
{
  options: [
    {
      label: Button 1, value: true,
      label: Button 2, value: false
    }
  ]
}
```

When field type is "option" the form component will render a full screen modal within a list. In this case, options can have two types of configuration.

The first configuration (below) will display static values in the list. When user click over any option it will be automatically selected and the value inside "value" key will be rendered in the form object value and in the form screen.
```javascript
{
  options: [
    { label: "Label 1", value: "value1" },
    { label: "Label 2", value: "value2" }
  ]
}
```

The second configuration must define a options provider which is a function that receives some filters (including the value inputed by the user inside the header of the component) and extra options like which page user scrolled and size of options inside each page.
```javascript
{
  options: {
    // Resolver is the function that will receive the options as decribed above
    // and must return a Promise which resolves the options array object in
    // the "label-value" keys value.
    resolver: Function,
    // Size of options loaded by each page.
    pageSize: Integer,
    // The key name which the value of input from options modal header
    // will be stored.
    inputName: String,
    // Object containing the form value. This form will be used as 
    // filter object within the resolver function.
    filter: Object
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