import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class SimpleLabel extends Component {
  render() {
    return (
      <View style={styles.labelWrapper}>
        <Text style={styles.label}>{this.props.label}</Text>
        {this.props.children}
      </View>
    );
  }
}

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