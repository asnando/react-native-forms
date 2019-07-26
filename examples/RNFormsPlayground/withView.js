import React, { Fragment } from  'react';
import {
  Form,
  FormView,
  TextInput,
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
        {/* <Submit /> */}
      </FormView>
    </Form>
  );
};

export default WithView;
