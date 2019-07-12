/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import { Button, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import FormView from './FormView';
import {
  FormStepViewContainer,
  FormStepViewTopContainer,
  FormStepViewTitleContainer,
  FormStepViewTitle,
  FormStepViewFormContainer,
} from './FormStepView.styles';

class FormStepView extends Component {
  // We create the state within fields in order to support
  // the "showWhen" feature seted inside the field object configuration.
  constructor(props) {
    super(props);
    const { fields } = props;
    this.state = {
      fields: [...fields],
    };
  }

  // eslint-disable-next-line class-methods-use-this
  onStepLeave() {
    return Keyboard.dismiss();
  }

  render() {
    const { props } = this;
    const {
      title,
      isFirstTab,
      canClose,
      closeButtonTitle,
      backButtonTitle,
      onCloseRequest,
      onTabSubmit,
      onInvalid,
      requestPreviousTab,
      stepButtonColor,
      stepButtonTextColor,
    } = props;
    const { fields } = this.state;
    return (
      <FormStepViewContainer>
        {/* Top Icons */}
        <FormStepViewTopContainer>
          {
            // eslint-disable-next-line no-nested-ternary
            isFirstTab
              ? canClose
                ? <Button title={closeButtonTitle} onPress={onCloseRequest} />
                : null
              : <Button title={backButtonTitle} onPress={requestPreviousTab} />
          }
        </FormStepViewTopContainer>
        {/* Title */}
        <FormStepViewTitleContainer>
          <FormStepViewTitle>
            {title}
          </FormStepViewTitle>
        </FormStepViewTitleContainer>
        {/* Form */}
        <FormStepViewFormContainer>
          <FormView
            {...this.props}
            fields={fields}
            onSubmit={onTabSubmit}
            onInvalid={onInvalid}
            submitButtonColor={stepButtonColor}
            submitButtonTextColor={stepButtonTextColor}
          />
        </FormStepViewFormContainer>
      </FormStepViewContainer>
    );
  }
}

const noop = () => {};

FormStepView.defaultProps = {
  fields: [],
  title: null,
  closeButtonTitle: null,
  backButtonTitle: null,
  isFirstTab: false,
  canClose: noop,
  onCloseRequest: noop,
  onTabSubmit: noop,
  onInvalid: noop,
  requestPreviousTab: noop,
  stepButtonColor: null,
  stepButtonTextColor: null,
};

FormStepView.propTypes = {
  fields: PropTypes.array,
  title: PropTypes.string,
  isFirstTab: PropTypes.bool,
  canClose: PropTypes.bool,
  closeButtonTitle: PropTypes.string,
  backButtonTitle: PropTypes.string,
  onCloseRequest: PropTypes.func,
  onTabSubmit: PropTypes.func,
  onInvalid: PropTypes.func,
  requestPreviousTab: PropTypes.func,
  stepButtonColor: PropTypes.string,
  stepButtonTextColor: PropTypes.string,
};

export default FormStepView;
