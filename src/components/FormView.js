import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import mapChildrenWithProps from '../helpers/mapChildrenWithProps';
import { FormViewContainer } from './FormView.styles';

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
    const invalid = fields.find(field => !field.validate());
    return !invalid;
  }

  whichActiveFormViewFieldIsInvalid() {
    const { fields } = this;
    try {
      return fields.find(field => !field.validate()).getDisplayName();
    } catch (exception) {
      return null;
    }
  }

  clear() {
    
  }

  saveFormViewRefOnParent() {
    const { saveFormViewRef } = this.props;
    if (typeof saveFormViewRef === 'function') {
      saveFormViewRef(this);
    }
  }

  handleFormFieldValue(name, value) {
    console.log(`${name}: "${value}"`);
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
