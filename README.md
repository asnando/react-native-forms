# React Native FormX
⚛️ 📃 React Native custom form builder with support for plain form, tabs and step-by-step.

# Native Dependencies
[react-native-gesture-handler](https://github.com/kmagiera/react-native-gesture-handler)

[react-native-reanimated](https://github.com/kmagiera/react-native-reanimated)

[react-native-tab-view](https://github.com/react-native-community/react-native-tab-view)

# Installation
```bash
npm i react-native-formx

react-native link react-native-gesture-handler
react-native link react-native-reanimated
react-native link react-native-tab-view
```

# Examples
See ```examples/RNFormsPlayground``` for examples that you can play with.

| Plain Form | Step by step | Tabs |
| :--------: | :----------: | :--: |
| <img src="https://user-images.githubusercontent.com/33915907/62220056-c940cc00-b385-11e9-8c77-a8908ed07e67.gif" /> |  <img src="https://user-images.githubusercontent.com/33915907/62220059-c9d96280-b385-11e9-92c2-c9e101f94149.gif" /> | <img src="https://user-images.githubusercontent.com/33915907/62220057-c940cc00-b385-11e9-835a-c05969b61e6c.gif" />


# Components
| Name | Usage |
| ---- | ----- |
| Form | Form is the root component of the tree. It will render the internal form tree and will make avaiable the handlers for your component.
| FormView | FormView is where all your fields will be really rendered. This is basically a View with all the fields(which are another components) rendered inside and some extra methods to handle internal submits/clears/validations events.
| FormTabs | FormTabs is a manager for ```FormTab``` components.
| FormTab | Imagine FormTab as a simple View rendered inside the ```FormTabs``` manager. Inside it will be displayed a ```FormView``` component where the fields will be rendered.
| FormSteps | FormSteps is a amnager for ```FormStep``` components.
| FormStep | Imagine FormStep as a simple View rendered inside the ```FormSteps``` manager. Inside it will be displayed a ```FormView``` component where the fields will be rendered. FormStep will contain specific step-by-step buttons like ```Back``` and ```Next Step```.

# Usage
## Using components
```jsx
import { Form } from 'react-native-formx';

const MyComponent = props => (
  <Form>
    /* Rendering as plain form */
    <FormView>
      {fields}
    </FormView>
    /* Rendering as tabs */
    <FormTabs>
      <FormTab title="Tab 1">
        {fields}
      </FormTab>
      <FormTab title="Tab 2">
        {fields}
      </FormTab>
    </FormTabs>
    /* Rendering as step-by-step */
    <FormSteps backButtonText="Go Back">
      <FormStep title="Step 1">
        {fields}
      </FormStep>
      <FormStep title="Step 2">
        {fields}
      </FormStep>
    </FormSteps>
  </Form>
);
```

## Using props
You can render a form using only a ```.js``` configuration. In that cases the root Form component will automatically render based on props.

### Plain form example
```javascript
// withViewProps.js

const withViewProps = {
  fields: [
    //  list of fields
  ],
};

export default withViewProps;
```

### Tabs example
```javascript
// withTabProps.js

const withTabProps = {
  tabIndicatorColor: 'white',
  tabTintColor: 'purple',
  tabTextColor: 'white',
  tabs: [
    {
      title: 'Tab 1',
      fields: [
        //  list of fields
      ]
    },
    {
      title: 'Tab 2',
      fields: [
        //  list of fields
      ],
    },
  ],
};

export default withTabProps;
```

### Step by step example
```javascript
// withStepProps.js

const withStepProps = {
  indicatorColor: 'purple',
  buttonTintColor: 'purple',
  buttonTextColor: 'white',
  backButtonTextColor: 'purple',
  nextStepButtonText: 'Next Step',
  backButtonText: 'Go Back',
  steps: [
    {
      title: 'Step 1',
      fields: [
        // list of fields
      ],
    },
    {
      title: 'Step 2',
      fields: [
        // list of fields
      ],
    },
    {
      title: 'Step 3',
      fields: [
        // list of fields
      ],
    },
  ],
};

export default withStepProps;
```

then...

```javascript
import { Form } from 'react-native-formx';
import withViewProps from './withViewProps';

const MyComponent = props => (
  <Form {...withViewProps} />
);
```

## Methods
| Name | Description | Support |
| ---- | ----------- | ------- |
| submit | Manually submits the form. The form data will be avaiable on the [onSubmit]() handler. | * |
| clear | Manually clears the form. | FormView, FormTabs | 

## Handlers
| Name | Description |
| ---- | ----------- |
| onSubmit | Called after button of submit type pressed or manual call to [submit]() public method.
| onInvalid | Called when user tries to submit or request a new step and any of the active FormView fields have invalid values. The field payload will be defined as the first argument on this callback.

### Example:
```jsx
const handleSubmitForm = formData => console.log(formData);

const handleInvalidForm = field => {
  console.log(`Form "${field}" field got invalid value.`);
};

<Form
  {...props}
  onSubmit={handleSubmitForm}
  onInvalid={handleInvalidForm}
/>
```

## Containers props
List of acceptable props for containers components.

### FormStep
| Name | Type |
| ---- | ---- |
| title | String |
| backButtonText | String |
| nextStepButtonText | String |
| buttonTintColor | Color |
| buttonTextColor | Color |
| submitButtonText | String |

### FormTabs
| Name | Type |
| ---- | ---- |
| tabTintColor | Color |
| tabTextColor | Color |
| tabIndicatorColor | Color |

## Field types
### Clear
Renders a clear button alongside the FormView content. This will automatically call the clear form method from inside it.

| Prop | Type |
| ---- | ---- |
| title | String
| buttonTintColor | Color |
| buttonTextColor | Color |

Refers to this field using ```clear``` field type when rendering <b>from props</b>.

---

### MaskedTextInput
Renders a [react-native-text-input-mask](https://github.com/ffrm/react-native-text-input-mask) text input component.

| Prop | Type |
| ---- | ---- |
| name | String |
| title | String |
| maskType | String |
| validators | String |

See [react-native-text-input-mask](https://github.com/ffrm/react-native-text-input-mask) for more avaiable props.

Refers to this field using ```masked``` field type when rendering <b>from props</b>.

---

### Option
Renders a [react-native-modal-select-list](https://github.com/ffrm/react-native-modal-select-list) component.

| Prop | Type |
| ---- | ---- |
| name | String |
| title | String |
| required | Boolean |
| options | Array[[react-native-modal-select-list](https://github.com/ffrm/react-native-modal-select-list)]

Refers to this field using ```option``` field type when rendering <b>from props</b>.

---

### Radio
Renders a radio button with a list of options.

| Prop | Type |
| ---- | ---- |
| name | String |
| title | String |
| options | Array[{ label: String, value: any }] |

Refers to this field using ```radio``` field type when rendering <b>from props</b>.

---

### Submit
Renders a submit button alongside the FormView content. This will automatically call the submit form method from inside it.

| Prop | Type |
| ---- | ---- |
| title | String |
| buttonTintColor | Color |
| buttonTextColor | Color |

Refers to this field using ```submit``` field type when rendering <b>from props</b>.

---

### Switch
Renders a React Native Switch component.

| Prop | Type |
| ---- | ---- |
| name | String |
| title | String |
| activeColor | Color |

Refers to this field using ```switch``` field type when rendering <b>from props</b>.

---

### TextInput
Renders a plain React Native TextInput component.

| Prop | Type |
| ---- | ---- |
| title | String |
| name | String |
| required | Boolean |
| validators | String |

Refers to this field using ```text``` field type when rendering <b>from props</b>.

---

<i>Note: All the ```name``` are required at the runtime. This prop will be used to save the value from the form field inside the resumed form data object.</i>

## Supported masks
There are some default supported masks that can be displayed when using ```MaskedTextInput``` with the default ```maskType``` prop.

See [react-native-text-input-mask](https://github.com/ffrm/react-native-text-input-mask) for reference.

## Supported validators
You can use the following common validators as ```validator``` prop for ```TextInput``` and ```MaskedTextInput``` fields:

```email```,
```cpf```,
```cnpj```,
```phone```,
```br-cellphone```

## Developed by
[@ffrm - Fernando Rama](https://github.com/ffrm)