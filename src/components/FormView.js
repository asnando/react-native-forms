import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import mapChildrenWithProps from '../helpers/mapChildrenWithProps';
import { FormViewContainer } from './FormView.styles';

const getInvalidFieldFromList = fields => fields.find((field) => {
  if (typeof field.validate !== 'function') {
    return false;
  }
  return !field.validate();
});

class FormView extends PureComponent {
  constructor(props) {
    super(props);
    this.fields = [];
  }

  componentDidMount() {
    // Save this component reference into the parent
    // component "refs". This will be used for direct manipulations.
    this.saveFormViewRefOnParent();
  }

  getValues() {
    const { fields } = this;
    const formData = {};
    fields.forEach((field) => {
      const fieldName = field.getName();
      const fieldValue = field.getValue();
      formData[fieldName] = fieldValue;
    });
    return formData;
  }

  validate() {
    // This function will validate each field in the form using
    // the component "validate" method and returns a boolean if
    // all are valid or not.
    const { fields } = this;
    return !getInvalidFieldFromList(fields);
  }

  whichFormFieldIsInvalid() {
    const { fields } = this;
    try {
      return getInvalidFieldFromList(fields).getDisplayName();
    } catch (exception) {
      return null;
    }
  }

  saveFormViewRefOnParent() {
    const { saveFormViewRef } = this.props;
    if (typeof saveFormViewRef === 'function') {
      saveFormViewRef(this);
    }
  }

  saveFormFieldRef(ref) {
    this.fields.push(ref);
  }

  renderChildren() {
    const {
      children,
      onSubmitRequest,
    } = this.props;
    return mapChildrenWithProps(children, {
      saveFormFieldRef: this.saveFormFieldRef.bind(this),
      onSubmitRequest,
    });
  }

  render() {
    return (
      <FormViewContainer>
        {this.renderChildren()}
      </FormViewContainer>
    );
  }
}

FormView.defaultProps = {
  saveFormViewRef: null,
  children: null,
  onSubmitRequest: null,
};

FormView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  saveFormViewRef: PropTypes.func,
  onSubmitRequest: PropTypes.func,
};

export default FormView;
