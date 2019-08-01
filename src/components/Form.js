import React, { PureComponent } from 'react';
import { KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import {
  FormContainer,
  FormContainerStyle,
} from './Form.styles';
import FormView from './FormView';
import FormTabs from './FormTabs';
import FormSteps from './FormSteps';
import mapChildrenWithProps from '../helpers/mapChildrenWithProps';

const stripNullsAndEmptiesFromObject = (object) => {
  const keys = Object.keys(object);
  keys.forEach((key) => {
    const value = object[key];
    if (value === null || typeof value === 'undefined' || (typeof value === 'string' && !value.trim())) {
      delete object[key];
    }
  });
  return object;
};

const initialState = {
  formData: {},
};

class Form extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  getFormViewData() {
    const { formView } = this;
    return formView.getValues();
  }

  // When form is not using tab nor steps, the FormView component
  // reference is directly registered inside this component.
  saveFormViewRef(ref) {
    this.formView = ref;
  }

  // The tabs manager(FormTabs) reference must be registered inside
  // this component in order to handle directly actions like
  // submit and clear form from custom rendered buttons.
  saveFormTabsRef(ref) {
    this.formTabs = ref;
  }

  usingTabs() {
    const { formTabs } = this;
    return !!formTabs;
  }

  usingNormalView() {
    const { formView } = this;
    return !!formView;
  }

  isFormViewValid() {
    const { formView } = this;
    return formView.validate();
  }

  whichFormViewFieldIsInvalid() {
    const { formView } = this;
    return formView.whichFormFieldIsInvalid();
  }

  // Fires the 'handleSubmitRequest' event from the FormTabs
  // manager inside this component children.
  callFormTabsSubmit() {
    const { formTabs } = this;
    formTabs.handleSubmitRequest();
  }

  submit(formData) {
    const {
      onSubmit,
      onInvalid,
    } = this.props;

    if (formData) {
      if (typeof onSubmit === 'function') {
        onSubmit(stripNullsAndEmptiesFromObject(formData));
      }
    } else if (this.usingNormalView()) {
      if (!this.isFormViewValid() && typeof onInvalid === 'function') {
        onInvalid(this.whichFormViewFieldIsInvalid());
      } else if (typeof onSubmit === 'function') {
        onSubmit(stripNullsAndEmptiesFromObject(this.getFormViewData()));
      }
    } else if (this.usingTabs()) {
      // When using form with tabs and user press a custom submit
      // button that manually calls this component method.
      this.callFormTabsSubmit();
    } else {
      // eslint-disable-next-line no-console
      console.warn('There is no registered FormView component in Form. Maybe you are using form with steps. In that cases the submit must be done directly from inside the form.');
    }
  }

  clear() {
    if (this.usingNormalView()) {
      const { formView } = this;
      formView.clear();
    } else if (this.usingTabs()) {
      const { formTabs } = this;
      // Fires the 'handleClearRequest' FormTabs manager event.
      formTabs.handleClearRequest();
    } else {
      // eslint-disable-next-line no-console
      console.warn('There is no registered FormView component in Form. Maybe you are using form with steps. In that cases the clear must be done directly from inside the form.');
    }
  }

  // This method will be called when form is configured
  // to use tabs or normal view and the submit button inside
  // FormView is pressed.
  // Note.: When using tabs it will only be called if the form is
  // already validated.
  handleSubmitRequest(formData) {
    // When there is not formData object means that the caller directly
    // called the submit and expect this component to resolve the formData.
    // This case occurs when the normal view directly call this.
    return this.submit(formData);
  }

  // This method will be called when form is configured
  // to use tabs and the clear button inside FormView is pressed.
  handleClearRequest() {
    return this.clear();
  }

  // This method will be called from internal Form(steps or tabs)
  // any time that users tries to submit or request the next form step
  // and any one of the filters remais with invalid value.
  handleInvalidField(displayName) {
    const { onInvalid } = this.props;
    if (typeof onInvalid === 'function') {
      onInvalid(displayName);
    }
  }

  getChildrenCommonProps() {
    return {
      onInvalidField: this.handleInvalidField.bind(this),
      onSubmitRequest: this.handleSubmitRequest.bind(this),
      onClearRequest: this.handleClearRequest.bind(this),
      saveFormViewRef: this.saveFormViewRef.bind(this),
      saveFormTabsRef: this.saveFormTabsRef.bind(this),
    };
  }

  renderFormFromChildren() {
    const { children } = this.props;
    if (typeof children === 'undefined') {
      // Will render the form from props.
      throw new Error('Render from props not avaiable yet.');
    }
    const childrenProps = this.getChildrenCommonProps();
    // Will render the form using children components.
    return mapChildrenWithProps(children, childrenProps);
  }

  renderCustomFormView() {
    const { fields } = this.props;
    const childrenProps = this.getChildrenCommonProps();
    return (
      <FormView fields={fields} {...childrenProps} />
    );
  }

  renderCustomTabs() {
    const { props } = this;
    const childrenProps = this.getChildrenCommonProps();
    return (
      <FormTabs {...props} {...childrenProps} />
    );
  }

  renderCustomSteps() {
    const { props } = this;
    const childrenProps = this.getChildrenCommonProps();
    return (
      <FormSteps {...props} {...childrenProps} />
    );
  }

  renderForm() {
    const {
      children,
      fields,
      tabs,
      steps,
    } = this.props;
    if (children) {
      return this.renderFormFromChildren();
    }
    if (fields) {
      return this.renderCustomFormView();
    }
    if (tabs) {
      return this.renderCustomTabs();
    }
    if (steps) {
      return this.renderCustomSteps();
    }
    return null;
  }

  render() {
    const { style } = this.props;
    return (
      <KeyboardAvoidingView style={FormContainerStyle} behavior="padding" keyboardVerticalOffset={0} enabled>
        <FormContainer style={style}>
          {this.renderForm()}
        </FormContainer>
      </KeyboardAvoidingView>
    );
  }
}

Form.defaultProps = {
  style: null,
  onSubmit: null,
  onInvalid: null,
  children: undefined,
  fields: null,
  tabs: null,
  steps: null,
};

Form.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.object,
  onSubmit: PropTypes.func,
  onInvalid: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  fields: PropTypes.array,
  tabs: PropTypes.array,
  steps: PropTypes.array,
};

export default Form;
