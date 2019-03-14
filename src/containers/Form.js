import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import {
  FormTab,
  FormView
} from '../';

export default class Form extends Component {
  submit() {
    if (this.form && typeof this.form.submit === 'function') this.form.submit();
  }
  clear() {
    if (this.form && typeof this.form.clear === 'function') this.form.clear();
  }
  render() {
    return (
      // <KeyboardAvoidingView style={styles.form} behavior="padding" keyboardVerticalOffset={0}>
        <ScrollView style={styles.form} alwaysBounceVertical={false} keyboardShouldPersistTaps='always'>
          {
            this.props.tabs
              ? (<FormTab ref={(r) => this.form = r} {...this.props} />)
              : (<FormView {...this.props} ref={(r) => this.form = r} />)
          }
        </ScrollView>
      // </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
});