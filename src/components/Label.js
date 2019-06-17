import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SimpleLabel = (props) => {
  return (
    <View style={[styles.labelWrapper, props.style]}>
      <Text style={styles.label}>{props.label}</Text>
      {props.children}
    </View>
  );
}

export default SimpleLabel;

const styles = StyleSheet.create({
  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    marginRight: 16,
    fontSize: 24
  }
});