import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';

const OptionArrow = (props) => {
  return <Text style={styles.arrowRight}>></Text>;
}

export default OptionArrow;

const styles = StyleSheet.create({
  arrowRight: {
    position: 'absolute',
    right: 10,
    fontSize: 24,
    color: '#aaa'
  },
});