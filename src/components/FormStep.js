import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  TextButton,
  FullWidthButton,
} from 'rn-custom-button';
import {
  FormStepContainer,
  FormStepBackButtonStyle,
  FormStepBackButtonTextStyle,
  FormStepTitle,
} from './FormStep.styles';
import mapChildrenWithProps from '../helpers/mapChildrenWithProps';
import FormView from './FormView';

const DEFAULT_BACK_BUTTON_TEXT = 'Back';
const DEFAULT_NEXT_STEP_BUTTON_TEXT = 'Next';
const DEFAULT_SUBMIT_BUTTON_TEXT = 'Submit';

class FormStep extends PureComponent {
  getChildrenCommonProps() {
    const { saveFormViewRef } = this.props;
    return {
      saveFormViewRef,
    };
  }

  renderStep() {
    const { children, fields } = this.props;
    if (children) {
      return this.renderChildren();
    }
    if (fields) {
      return this.renderStepFormView();
    }
    return null;
  }

  renderStepFormView() {
    const { fields } = this.props;
    const childrenProps = this.getChildrenCommonProps();
    return (
      <FormView fields={fields} {...childrenProps} />
    );
  }

  renderChildren() {
    const { children } = this.props;
    const childrenProps = this.getChildrenCommonProps();
    return mapChildrenWithProps(children, childrenProps);
  }

  render() {
    const {
      title,
      isFirstStep,
      isLastStep,
      backButtonText,
      nextStepButtonText,
      buttonTintColor,
      buttonTextColor,
      submitButtonText,
      onSubmitRequest,
      onNextStepRequest,
      onPreviousStepRequest,
    } = this.props;
    return (
      <FormStepContainer>
        { !isFirstStep && (
          <TextButton
            title={backButtonText || DEFAULT_BACK_BUTTON_TEXT}
            buttonStyle={FormStepBackButtonStyle}
            buttonTextStyle={FormStepBackButtonTextStyle}
            buttonTextColor={buttonTintColor}
            onPress={onPreviousStepRequest}
          />
        )}
        { title && (<FormStepTitle>{title}</FormStepTitle>)}
        {this.renderStep()}
        { !isLastStep && (
          <FullWidthButton
            title={nextStepButtonText || DEFAULT_NEXT_STEP_BUTTON_TEXT}
            buttonTintColor={buttonTintColor}
            buttonTextColor={buttonTextColor}
            onPress={onNextStepRequest}
          />
        )}
        { isLastStep && (
          <FullWidthButton
            title={submitButtonText || DEFAULT_SUBMIT_BUTTON_TEXT}
            buttonTintColor={buttonTintColor}
            buttonTextColor={buttonTextColor}
            onPress={onSubmitRequest}
          />
        )}
      </FormStepContainer>
    );
  }
}

FormStep.defaultProps = {
  children: null,
  fields: null,
  isFirstStep: false,
  isLastStep: false,
  title: null,
  backButtonText: null,
  nextStepButtonText: null,
  buttonTintColor: null,
  buttonTextColor: null,
  submitButtonText: null,
  // Parent methods props.
  saveFormViewRef: null,
  onNextStepRequest: null,
  onPreviousStepRequest: null,
  onSubmitRequest: null,
};

FormStep.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  fields: PropTypes.array,
  isFirstStep: PropTypes.bool,
  isLastStep: PropTypes.bool,
  title: PropTypes.string,
  backButtonText: PropTypes.string,
  nextStepButtonText: PropTypes.string,
  buttonTintColor: PropTypes.string,
  buttonTextColor: PropTypes.string,
  submitButtonText: PropTypes.string,
  // Parent methods props.
  saveFormViewRef: PropTypes.func,
  onNextStepRequest: PropTypes.func,
  onPreviousStepRequest: PropTypes.func,
  onSubmitRequest: PropTypes.func,
};

export default FormStep;
