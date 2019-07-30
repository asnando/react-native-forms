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

const DEFAULT_BACK_BUTTON_TEXT = 'Back';
const DEFAULT_NEXT_STEP_BUTTON_TEXT = 'Next';
const DEFAULT_SUBMIT_BUTTON_TEXT = 'Submit';

class FormStep extends PureComponent {
  renderChildren() {
    const {
      children,
      saveFormViewRef,
    } = this.props;
    return mapChildrenWithProps(children, {
      saveFormViewRef,
    });
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
        {this.renderChildren()}
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
  ]).isRequired,
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
