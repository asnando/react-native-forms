import React, { Fragment } from 'react';
import { View, SafeAreaView, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { TextButton } from 'react-native-custom-button';
import { Form } from 'react-native-formx';
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
      <View style={{ flexDirection: 'row' }}>
        <TextButton
          title="Submit outside form"
          onPress={callFormSubmit}
          buttonStyle={{ flex: 1 }}
        />
        <TextButton
          title="Clear outside form"
          onPress={callFormClear}
          buttonStyle={{ flex: 1 }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default App;
