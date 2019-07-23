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

const renderFormFields = () => {
  return (
    <Fragment>
      <Text>{Date.now()} - Random text inside form</Text>
      <TextInput title="Test" />
    </Fragment>
  );
};

const renderFormTabs = () => {
  return (
    <FormTabs tabIndicatorColor="green">
      <FormTab title="First">
        <FormView>{renderFormFields()}</FormView>
      </FormTab>
      <FormTab title="Second">
        <FormView>{renderFormFields()}</FormView>
      </FormTab>
    </FormTabs>
  );
};

const renderFormSteps = () => {
  return (
    <FormSteps>
      <FormStep title="First Step">
        <FormView>{renderFormFields()}</FormView>
      </FormStep>
      <FormStep title="Second Step">
        <FormView>{renderFormFields()}</FormView>
      </FormStep>
    </FormSteps>
  );
};

const renderFormWithTabs = () => (
  <Form style={styles.form}>{renderFormTabs()}</Form>
);

const renderFormWithSteps = () => (
  <Form style={styles.form}>{renderFormSteps()}</Form>
);

const renderForms = () => (
  <Fragment>
    {renderFormWithTabs()}
    {renderFormWithSteps()}
  </Fragment>
);

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
