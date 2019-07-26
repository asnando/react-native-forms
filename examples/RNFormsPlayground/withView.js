import React, { Fragment } from  'react';
import {
  Form,
  FormView,
  TextInput,
  Submit,
  Switch,
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
