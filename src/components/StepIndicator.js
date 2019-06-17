import React from 'react';
import { StyleSheet, View } from 'react-native';

const StepIndicator = props => {
  return (
    <View style={styles.stepContainer}>
      { props.steps.map((step, stepIndex) =>
        <View
          key={stepIndex}
          style={[
            styles.stepIndicator,
            props.currentIndex === stepIndex
              ? props.indicatorActiveStyle || styles.stepIndicatorActive : null,
          ]} />
      )}
    </View>
  );
}

export default StepIndicator;

const styles = StyleSheet.create({
  stepContainer: {
    flexDirection: 'row',
    height: 128,
    paddingBottom: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  stepIndicator: {
    backgroundColor: '#bbb',
    width: 8,
    height: 8,
    borderRadius: 8,
    marginLeft: 4,
    marginRight: 4,
  },
  stepIndicatorActive: {
    backgroundColor: '#3d99fc'
  }
});