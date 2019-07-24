import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  TextButton,
  FullWidthButton,
} from 'react-native-custom-button';
import {
  FormStepContainer,
  FormStepBackButtonStyle,
  FormStepTitle,
} from './FormStep.styles';

class FormStep extends PureComponent {
  requestNextStep() {
    const { onNextStepRequest } = this.props;
    if (typeof onNextStepRequest === 'function') {
      onNextStepRequest();
    }
  }

  requestPreviousStep() {
    const { onPreviousStepRequest } = this.props;
    if (typeof onPreviousStepRequest === 'function') {
      onPreviousStepRequest();
    }
  }

  requestSubmit() {
    const { onSubmitRequest } = this.props;
    if (typeof onSubmitRequest === 'function') {
      onSubmitRequest();
    }
  }

  render() {
    const {
      children,
      title,
      isFirstStep,
      isLastStep,
      backButtonText,
      nextStepButtonText,
      submitButtonText,
    } = this.props;
    return (
      <FormStepContainer>
        { !isFirstStep && (
          <TextButton
            title={backButtonText}
            buttonStyle={FormStepBackButtonStyle}
            onPress={() => this.requestPreviousStep()}
          />
        )}
        { title && (<FormStepTitle>{title}</FormStepTitle>)}
        {children}
        { !isLastStep && (
          <FullWidthButton
            title={nextStepButtonText}
            onPress={() => this.requestNextStep()}
          />
        )}
        { isLastStep && (
          <FullWidthButton
            title={submitButtonText}
            onPress={() => this.requestSubmit()}
          />
        )}
      </FormStepContainer>
    );
  }
}

FormStep.defaultProps = {
  onNextStepRequest: null,
  onPreviousStepRequest: null,
  onSubmitRequest: null,
  isFirstStep: false,
  isLastStep: false,
  title: null,
  backButtonText: 'Back',
  nextStepButtonText: 'Next',
  submitButtonText: 'Submit',
};

FormStep.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  onNextStepRequest: PropTypes.func,
  onPreviousStepRequest: PropTypes.func,
  onSubmitRequest: PropTypes.func,
  isFirstStep: PropTypes.bool,
  isLastStep: PropTypes.bool,
  title: PropTypes.string,
  backButtonText: PropTypes.string,
  nextStepButtonText: PropTypes.string,
  submitButtonText: PropTypes.string,
};

export default FormStep;
