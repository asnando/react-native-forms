import React, { Component } from 'react';
import { Switch, Text, View, StyleSheet } from 'react-native';
import FormLabel from '../components/Label';

const initialState = {
  value: false
};

export default class FormSwitch extends Component {

  constructor() {
    super();
    this.state = initialState;
  }

  getValue() {
    return !!this.state.value;
  }

  clearValue() {
    return this.setState({
      ...this.state,
      value: false
    });
  }

  _handleValueChange(value) {
    this.setState({ value });
  }

  render() {
    return (
      <View style={styles.container}>
        <FormLabel label={this.props.label} />
        <Switch
          value={this.state.value}
          onValueChange={this._handleValueChange.bind(this)} />
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  }
});