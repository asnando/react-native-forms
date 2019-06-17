/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-return-assign */
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { formContainerStyle } from './Form.styles';
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

  render() {
    const { props } = this;
    const { steps, tabs } = props;
    return isArray(steps)
      ? (<FormWithSteps {...props} ref={r => this.form = r} />)
      : (
        <ScrollView
          contentContainerStyle={formContainerStyle}
          alwaysBounceVertical={false}
          keyboardShouldPersistTaps="always">
          { tabs
            ? (<FormTab {...props} ref={r => this.form = r} />)
            : (<FormView {...props} ref={r => this.form = r} />)
          }
        </ScrollView>
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
