import React, { Fragment } from  'react';
import {
  Form,
  FormSteps,
  FormStep,
  FormView,
  TextInput,
} from 'react-native-forms';

const WithSteps = () => {
  return (
    <Form>
      <FormSteps indicatorColor="purple">
        {/* Step 1 */}
        <FormStep title="Step 1">
          <FormView>
            <TextInput
              title="User Name"
              name="user_name"
              required
            />
          </FormView>
        </FormStep>
        {/* Step 2 */}
        <FormStep title="Step 2">
          <FormView>
            <TextInput
              title="User Email"
              name="user_email"
              keyboardType="email-address"
              required
            />
          </FormView>
        </FormStep>
        {/* Step 3 */}
        <FormStep title="Step 3">
          <FormView>
            <TextInput
              title="Birthday"
              name="user_birthday"
              required
            />
          </FormView>
        </FormStep>
      </FormSteps>
    </Form>
  );
};

export default WithSteps;
