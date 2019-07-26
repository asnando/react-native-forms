import React, { Fragment } from  'react';
import {
  Form,
  FormView,
  TextInput,
  Submit,
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
