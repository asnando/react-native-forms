import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TopLabel = (props) => {
  return <Text style={styles.topLabel}>{props.label}</Text>
}

export default TopLabel;

const styles = StyleSheet.create({
  topLabel: {
    position: 'absolute',
    top: 0,
    left: 0,
    fontSize: 18
  }
});