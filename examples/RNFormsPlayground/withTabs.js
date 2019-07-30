import React, { Fragment } from  'react';
import {
  Form,
  FormTabs,
  FormTab,
  FormView,
  TextInput,
  SubmitButton,
  ClearButton,
} from 'react-native-forms';

const WithTabs = (props) => {
  return (
    <FormTabs
      tabIndicatorColor="white"
      tabTintColor="purple"
      tabTextColor="white"
      {...props}
    >
      <FormTab title="Tab 1">
        <FormView>
          <TextInput
            name="user_name"
            title="User Name"
            required
          />
          <SubmitButton title="Submit" />
          <ClearButton title="Clear" />
        </FormView>
      </FormTab>
      <FormTab title="Tab 2">
        <FormView>
          <TextInput
            name="user_email"
            title="User Email"
            keyboardType="email-address"
            required
          />
          <SubmitButton title="Submit" />
          <ClearButton title="Clear" />
        </FormView>
      </FormTab>
    </FormTabs>
  );
};

export default WithTabs;
