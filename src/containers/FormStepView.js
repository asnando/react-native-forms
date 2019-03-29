import React from 'react';
import { StyleSheet, View, Button, Text } from 'react-native';
import FormView from './FormView';

const FormStepView = (props) => {
  return (
    <View style={styles.formStepViewContainer}>
      {
        props.isFirstTab
          ? null
          : (
            <View style={{ alignItems: 'flex-start' }}>
              <Button title={props.backButtonTitle} onPress={props.requestPreviousTab}></Button>
            </View>
          )
      }
      <View style={styles.formStepViewTitleContainer}>
        <Text style={styles.formStepViewTitle}>{props.title}</Text>
      </View>
      <FormView
        {...props}
        onSubmit={props.onTabSubmit}
        onInvalid={props.onInvalid} />
    </View>
  );
}

export default FormStepView;

const styles = StyleSheet.create({
  formStepViewContainer: {
    height: '100%',
    width: '90%',
    marginLeft: '5%',
  },
  formStepViewTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formStepViewTitle: {
    fontSize: 24,
  }
});