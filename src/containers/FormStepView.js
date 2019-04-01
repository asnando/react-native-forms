import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import FormView from './FormView';

const FormStepView = (props) => {
  return (
    <View style={styles.formStepViewContainer}>
      {/* Top Icons */}
      <View style={styles.formStepViewTopContainer}>
        { props.isFirstTab
          ? 
            props.canClose
              ? <Button title={props.closeButtonTitle} onPress={props.onCloseRequest}></Button>
              : null
          : <Button title={props.backButtonTitle} onPress={props.requestPreviousTab}></Button>
        }
      </View>
      {/* Title */}
      <View style={styles.formStepViewTitleContainer}>
        <Text style={styles.formStepViewTitle}>{props.title}</Text>
      </View>
      {/* Form */}
      <View style={styles.formStepViewFormContainer}>
        <FormView
          {...props}
          onSubmit={props.onTabSubmit}
          onInvalid={props.onInvalid} />
      </View>
    </View>
  );
}

export default FormStepView;

const styles = StyleSheet.create({
  formStepViewContainer: {
    flex: 1,
    width: '80%',
    marginLeft: '10%',
  },
  formStepViewTopContainer: {
    alignItems: 'flex-start',
    width: '100%',
  },
  formStepViewTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'red',
  },
  formStepViewTitle: {
    fontSize: 32,
  },
  formStepViewFormContainer: {
    // backgroundColor: 'green',
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  }
});