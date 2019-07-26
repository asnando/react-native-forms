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
import mapChildrenWithProps from '../helpers/mapChildrenWithProps';

class FormStep extends PureComponent {
  isActiveFormViewValid() {
    const { formView } = this;
    return formView.validate();
  }

  whichActiveFormViewFieldIsInvalid() {
    const { formView } = this;
    return formView.whichActiveFormViewFieldIsInvalid();
  }
  
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

  handleNextStepRequest() {
    const { onInvalidField } = this.props;
    console.log('Requesting next step');
    // Check if active FormView have all valid fields.
    // Then request the transition to the next step FormView.
    if (this.isActiveFormViewValid()) {
      this.requestNextStep();
    }
    if (typeof onInvalidField === 'function') {
      const invalidFieldName = this.whichActiveFormViewFieldIsInvalid();
      onInvalidField(invalidFieldName);
    }
  }

  handleSubmitRequest() {
    console.log('Requesting step submit');
    
  }

  saveFormView(ref) {
    this.formView = ref;
  }

  renderChildren() {
    const { children } = this.props;
    return mapChildrenWithProps(children, {
      saveFormViewRef: this.saveFormView.bind(this),
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
        {this.renderChildren()}
        { !isLastStep && (
          <FullWidthButton
            title={nextStepButtonText}
            buttonTintColor={buttonTintColor}
            buttonTextColor={buttonTextColor}
            onPress={() => this.handleNextStepRequest()}
          />
        )}
        { isLastStep && (
          <FullWidthButton
            title={submitButtonText}
            buttonTintColor={buttonTintColor}
            buttonTextColor={buttonTextColor}
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
  onInvalidField: null,
  isFirstStep: false,
  isLastStep: false,
  title: null,
  backButtonText: 'Back',
  nextStepButtonText: 'Next',
  buttonTintColor: null,
  buttonTextColor: null,
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
  onInvalidField: PropTypes.func,
  isFirstStep: PropTypes.bool,
  isLastStep: PropTypes.bool,
  title: PropTypes.string,
  backButtonText: PropTypes.string,
  nextStepButtonText: PropTypes.string,
  buttonTintColor: PropTypes.string,
  buttonTextColor: PropTypes.string,
  submitButtonText: PropTypes.string,
};

export default FormStep;
