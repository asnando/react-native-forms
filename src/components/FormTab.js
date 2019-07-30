import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormTabContainer } from './FormTab.styles';
import mapChildrenWithProps from '../helpers/mapChildrenWithProps';
import FormView from './FormView';

class FormTab extends PureComponent {
  getChildrenCommonProps() {
    const {
      onSubmitRequest,
      onClearRequest,
      saveFormViewRef,
    } = this.props;
    return {
      onSubmitRequest,
      onClearRequest,
      saveFormViewRef,
    };
  }

  renderChildren() {
    const { children } = this.props;
    const childrenProps = this.getChildrenCommonProps();
    return mapChildrenWithProps(children, childrenProps);
  }

  renderTabFormView() {
    const { fields } = this.props;
    const childrenProps = this.getChildrenCommonProps();
    return (
      <FormView fields={fields} {...childrenProps} />
    );
  }

  renderTab() {
    const { children, fields } = this.props;
    if (children) {
      return this.renderChildren();
    }
    if (fields) {
      return this.renderTabFormView();
    }
    return null;
  }

  render() {
    return (
      <FormTabContainer>
        {this.renderTab()}
      </FormTabContainer>
    );
  }
}

FormTab.defaultProps = {
  children: null,
  fields: null,
  onSubmitRequest: null,
  onClearRequest: null,
  saveFormViewRef: null,
};

FormTab.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  fields: PropTypes.array,
  onSubmitRequest: PropTypes.func,
  onClearRequest: PropTypes.func,
  saveFormViewRef: PropTypes.func,
};

export default FormTab;
