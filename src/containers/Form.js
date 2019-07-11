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
      const {
        tabTintColor,
        tabIndicatorColor,
        tabTextColor,
      } = props;
      return (
        <FormTab
          {...props}
          ref={r => this.form = r}
          tabTintColor={tabTintColor}
          tabIndicatorColor={tabIndicatorColor}
          tabTextColor={tabTextColor}
        />
      );
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
  tabIndicatorColor: null,
  tabTextColor: null,
  tabTintColor: null,
};

Form.propTypes = {
  steps: PropTypes.array,
  tabs: PropTypes.array,
  tabIndicatorColor: PropTypes.string,
  tabTextColor: PropTypes.string,
  tabTintColor: PropTypes.string,
};

export default Form;
