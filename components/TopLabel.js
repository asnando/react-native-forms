import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

export default class TopLabel extends Component {
  render() {
    return <Text style={styles.topLabel}>{this.props.label}</Text>
  }
}

const styles = StyleSheet.create({
  topLabel: {
    position: 'absolute',
    top: 0,
    left: 0,
    fontSize: 18
  }
});