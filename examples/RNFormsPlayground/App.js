import React, { Fragment } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { FullWidthButton } from 'react-native-custom-button';
import { Form } from 'react-native-forms';
import WithView from './withView';
import WithTabs from  './withTabs';
import WithSteps from './withSteps';
import withViewProps from './withViewProps';
import withTabProps from './withTabProps';
import withStepProps from './withStepProps';

console.disableYellowBox = true;

const App = () => {
  let formRef;
  const saveFormRef = ref => formRef = ref;
  const onSubmit = formData => console.log(formData);
  const onInvalid = fieldName => console.log(`"${fieldName}" got invalid value.`);
  const callFormSubmit = () => formRef.submit();
  const callFormClear = () => formRef.clear();
  const props = {
    onSubmit,
    onInvalid,
  };
  return (
    <SafeAreaView style={styles.container}>
      <Form
        ref={saveFormRef}
        onSubmit={onSubmit}
        onInvalid={onInvalid}
        // {...withViewProps}
        // {...withTabProps}
        {...withStepProps}
      >
        {/* <WithView {...props} /> */}
        {/* <WithTabs {...props} /> */}
        {/* <WithSteps {...props} /> */}
      </Form>
      {/* Example to use with tabs */}
      <FullWidthButton title="Submit Form" onPress={callFormSubmit} />
      <FullWidthButton title="Clear Form" onPress={callFormClear} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});

export default App;
