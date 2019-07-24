import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import {
  Form,
  FormTabs,
  FormTab,
  FormSteps,
  FormStep,
  FormView,
  TextInput,
} from 'react-native-forms';

// const renderFormFields = () => {
//   return (
//     <Fragment>
//       <Text>{Date.now()} - Random text inside form</Text>
//       <TextInput title="Test" name={Date.now().toString()} />
//     </Fragment>
//   );
// };

// const renderFormTabs = () => {
//   return (
//     <FormTabs tabIndicatorColor="green">
//       <FormTab title="First">
//         <FormView>{renderFormFields()}</FormView>
//       </FormTab>
//       <FormTab title="Second">
//         <FormView>{renderFormFields()}</FormView>
//       </FormTab>
//     </FormTabs>
//   );
// };

const renderFormSteps = () => {
  return (
    <FormSteps>
      <FormStep
        title="First Step"
        nextStepButtonText="Go to step 2"
      >
        <FormView>
          <Text>Random text inside form</Text>
          <TextInput title="Name" name="user_name" />
        </FormView>
      </FormStep>
      <FormStep
        title="Second Step"
        nextStepButtonText="Go to step 3"
        backButtonText="Back to step 1"
        buttonTintColor="purple"
        buttonTextColor="white"
      >
        <FormView>
          <TextInput
            title="E-mail"
            keyboardType="email-address"
            name="user_email"
          />
        </FormView>
      </FormStep>
      <FormStep
        title="Third Step"
        submitButtonText="Submit form"
        backButtonText="Back to step 2"
      >
        <FormView>
        </FormView>
      </FormStep>
    </FormSteps>
  );
};

// const renderFormWithTabs = () => (
//   <Form style={styles.form}>{renderFormTabs()}</Form>
// );

const renderFormWithSteps = () => (
  <Form style={styles.form}>{renderFormSteps()}</Form>
);

// const renderForms = () => (
//   <Fragment>
//     {renderFormWithTabs()}
//     {renderFormWithSteps()}
//   </Fragment>
// );

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* {renderForms()} */}
      {renderFormWithSteps()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  form: {
    
  }
});

export default App;
