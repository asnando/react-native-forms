import React, { Fragment } from  'react';
import {
  Form,
  FormTabs,
  FormTab,
  FormView,
  TextInput,
} from 'react-native-forms';

const WithTabs = () => {
  return (
    <Form>
      <FormTabs
        tabIndicatorColor="white"
        tabTintColor="purple"
        tabTextColor="white"
      >
        <FormTab title="Tab 1">
          <FormView>
            <TextInput
              name="user_name"
              title="User Name"
              required
            />
          </FormView>
        </FormTab>
        <FormTab title="Tab 2">
          <FormView>
            <TextInput
              name="user_name"
              title="User Email"
              keyboardType="email-address"
              required
            />
          </FormView>
        </FormTab>
      </FormTabs>
    </Form>
  );
};

export default WithTabs;
