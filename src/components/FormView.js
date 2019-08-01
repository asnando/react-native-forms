import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import mapChildrenWithProps from '../helpers/mapChildrenWithProps';
import { FormViewContainer } from './FormView.styles';
import MaskedTextInput from './fields/MaskedTextInput';
import Option from './fields/Option';
import Radio from './fields/Radio';
import Switch from './fields/Switch';
import TextInput from './fields/TextInput';
import SubmitButton from './buttons/Submit';
import ClearButton from './buttons/Clear';

const getInvalidFieldFromList = fields => fields.find((field) => {
  if (typeof field.validate !== 'function') {
    return false;
  }
  return !field.validate();
});

const clearFields = fields => fields.forEach((field) => {
  if (typeof field.clear === 'function') {
    field.clear();
  }
});

const createFormViewField = (field, props) => {
  const { type } = field;
  const fieldProps = {
    ...props,
    ...field,
  };
  switch (type) {
    case 'masked':
      return (
        <MaskedTextInput {...fieldProps} />
      );
    case 'option':
      return (
        <Option {...fieldProps} />
      );
    case 'radio':
      return (
        <Radio {...fieldProps} />
      );
    case 'switch':
      return (
        <Switch {...fieldProps} />
      );
    case 'submit':
      return (
        <SubmitButton {...fieldProps} />
      );
    case 'clear':
      return (
        <ClearButton {...fieldProps} />
      );
    case 'text':
    default:
      return (
        <TextInput {...fieldProps} />
      );
  }
};

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

  getChildrenCommonProps() {
    const {
      onSubmitRequest,
      onClearRequest,
    } = this.props;
    return {
      saveFormFieldRef: this.saveFormFieldRef.bind(this),
      onSubmitRequest,
      onClearRequest,
    };
  }

  // Receive this notification when parent component is a form steps
  // and it transitioned to this view. Will tell all fields from
  // this view that this event occurred so they can dynamic show/hide.
  formViewGotActive(formData) {
    const { fields } = this;
    fields.forEach((field) => {
      if (typeof field.fieldGotActive === 'function') {
        field.fieldGotActive(formData);
      }
    });
  }

  validate() {
    // This function will validate each field in the form using
    // the component "validate" method and returns a boolean if
    // all are valid or not.
    const { fields } = this;
    return !getInvalidFieldFromList(fields);
  }

  clear() {
    const { fields } = this;
    return clearFields(fields);
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

  // This method will be called by every children field to
  // register its reference into this component. Then when we need
  // to validate all fields on form, get its values or perform any of
  // these actions we will have the fields reference list.
  saveFormFieldRef(ref) {
    this.fields.push(ref);
  }

  renderFromChildren() {
    const { children } = this.props;
    const childrenProps = this.getChildrenCommonProps();
    return mapChildrenWithProps(children, childrenProps);
  }

  renderFromFieldList() {
    const { fields } = this.props;
    const childrenProps = this.getChildrenCommonProps();
    return fields.map((field, index) => createFormViewField({
      ...field,
      key: index,
    }, childrenProps));
  }

  renderChildren() {
    const {
      children,
      fields,
    } = this.props;
    if (children) {
      return this.renderFromChildren();
    }
    if (fields) {
      return this.renderFromFieldList();
    }
    return null;
  }

  render() {
    return (
      <ScrollView alwaysBounceVertical={false} keyboardShouldPersistTaps="handled">
        <FormViewContainer>
          {this.renderChildren()}
        </FormViewContainer>
      </ScrollView>
    );
  }
}

FormView.defaultProps = {
  children: null,
  fields: null,
  saveFormViewRef: null,
  onSubmitRequest: null,
  onClearRequest: null,
};

FormView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  fields: PropTypes.array,
  saveFormViewRef: PropTypes.func,
  onSubmitRequest: PropTypes.func,
  onClearRequest: PropTypes.func,
};

export default FormView;
