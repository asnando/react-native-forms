/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import { FormContainer, formScrollViewStyle } from './Form.styles';
import FormTab from './FormTab';
import FormView from './FormView';
import FormWithSteps from './FormWithSteps';

const isArray = array => Array.isArray(array);

class Form extends Component {
  getValue() {
    return this.form.getValue();
  }

  submit() {
    const { form } = this;
    if (form && typeof form.submit === 'function') form.submit();
  }

  clear() {
    const { form } = this;
    if (form && typeof form.clear === 'function') form.clear();
  }

  renderForms() {
    const { props } = this;
    const { steps, tabs } = props;
    if (isArray(steps)) {
      return <FormWithSteps {...props} ref={r => this.form = r} />;
    }
    if (tabs) {
      return <FormTab {...props} ref={r => this.form = r} />;
    }
    return <FormView {...props} ref={r => this.form = r} />;
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={16} enabled>
        <FormContainer>
          <ScrollView alwaysBounceVertical={false} keyboardShouldPersistTaps="handled" contentContainerStyle={formScrollViewStyle}>
            {this.renderForms()}
          </ScrollView>
        </FormContainer>
      </KeyboardAvoidingView>
    );
  }
}

Form.defaultProps = {
  steps: null,
  tabs: null,
};

Form.propTypes = {
  steps: PropTypes.array,
  tabs: PropTypes.array,
};

export default Form;
