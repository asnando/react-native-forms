import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  FormContainer,
} from './Form.styles';
import mapChildrenWithProps from '../helpers/mapChildrenWithProps';

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

  submit() {
    console.log('Called Form.submit()');
    const { onSubmit, onInvalid } = this.props;
    if (this.usingNormalView()) {
      if (!this.isFormViewValid() && typeof onInvalid === 'function') {
        onInvalid(this.whichFormViewFieldIsInvalid());
      } else if (typeof onSubmit === 'function') {
        onSubmit(this.getFormViewData());
      }
    } else if (this.usingTabs()) {
      // When using form with tabs and user press a custom submit
      // button that manually calls this component method.
      this.callFormTabsSubmit();
    } else {
      // eslint-disable-next-line no-console
      console.log('There is no registered FormView component in Form. Maybe you are using form with steps. In that cases the submit must be done directly from inside the form.');
    }
  }

  clear() {
    console.log('Called Form.clear()');
    if (this.usingNormalView()) {
      const { formView } = this;
      formView.clear();
    } else if (this.usingTabs()) {
      const { formTabs } = this;
      // Fires the 'handleClearRequest' FormTabs manager event.
      formTabs.handleClearRequest();
    } else {
      // eslint-disable-next-line no-console
      console.log('There is no registered FormView component in Form. Maybe you are using form with steps. In that cases the clear must be done directly from inside the form.');
    }
  }

  // This method will be called when form is configured
  // to use tabs or normal view and the submit button inside
  // FormView is pressed.
  // Note.: When using tabs it will only be called if the form is
  // already validated.
  handleSubmitRequest(formData) {
    console.log('Form.handleSubmitRequest()', formData);
    // When there is not formData object means that the caller directly
    // called the submit and expect this component to resolve the formData.
    // This case occurs when the normal view directly call this.
    if (!formData) {
      this.submit();
    } else {
      const { onSubmit } = this.props;
      if (typeof onSubmit === 'function') {
        onSubmit(formData);
      }
    }
  }

  // This method will be called when form is configured
  // to use tabs and the clear button inside FormView is pressed.
  handleClearRequest() {
    console.log('Form.handleClearRequest()');
    return this.clear();
  }

  // This method will be called from internal Form(steps or tabs)
  // any time that users tries to submit or request the next form step
  // and any one of the filters remais with invalid value.
  handleInvalidField(displayName) {
    console.log('Form.handleInvalidField()');
    const { onInvalid } = this.props;
    if (typeof onInvalid === 'function') {
      onInvalid(displayName);
    }
  }

  renderForm() {
    const { children } = this.props;
    if (typeof children === 'undefined') {
      // Will render the form from props.
      throw new Error('Render from props not avaiable yet.');
    }
    // Will render the form using children components.
    return mapChildrenWithProps(children, {
      onInvalidField: this.handleInvalidField.bind(this),
      onSubmitRequest: this.handleSubmitRequest.bind(this),
      onClearRequest: this.handleClearRequest.bind(this),
      saveFormViewRef: this.saveFormViewRef.bind(this),
      saveFormTabsRef: this.saveFormTabsRef.bind(this),
    });
  }

  render() {
    return (
      <FormContainer>
        {this.renderForm()}
      </FormContainer>
    );
  }
}

Form.defaultProps = {
  onSubmit: null,
  onInvalid: null,
  children: undefined,
};

Form.propTypes = {
  onSubmit: PropTypes.func,
  onInvalid: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
};

export default Form;
