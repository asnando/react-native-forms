import React, { Fragment } from  'react';
import {
  Form,
  FormView,
  TextInput,
  Submit,
  Switch,
  Radio,
  Option,
} from 'react-native-forms';

const WithView = () => {
  return (
    <Form>
      <FormView>
        <TextInput
          name="user_name"
          title="User Name"
          required
        />
        <Switch
          title="Receive News"
          name="receive_news"
          activeColor="purple"
        />
        <Radio
          title="Select a option"
          name="options"
          options={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
          ]}
        />
        <Option
          title="Select one option from the modal list"
          name="another_options"
          options={[
            { label: 'Option 1', value: 'option1' },
            { label: 'Option 2', value: 'option2' },
          ]}
        />
        <Submit
          title="Send"
          buttonTintColor="purple"
          buttonTextColor="white"
        />
      </FormView>
    </Form>
  );
};

export default WithView;
