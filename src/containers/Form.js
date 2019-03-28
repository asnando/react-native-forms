import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { FormTab, FormView, FormWithSteps, } from '../';

export default class Form extends Component {
  submit() {
    if (this.form && typeof this.form.submit === 'function') this.form.submit();
  }
  clear() {
    if (this.form && typeof this.form.clear === 'function') this.form.clear();
  }
  render() {
    if (Array.isArray(this.props.steps)) {
      return <FormWithSteps {...this.props} ref={r => this.form = r} />;
    }
    return (
      <ScrollView
        style={[ styles.form, this.props.style ]}
        alwaysBounceVertical={false}
        keyboardShouldPersistTaps='always'>
        {
          this.props.tabs
            ? (<FormTab {...this.props} ref={r => this.form = r} />)
            : (<FormView {...this.props} ref={r => this.form = r} />)
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    flex: 1
  },
});