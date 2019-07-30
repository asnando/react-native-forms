import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormTabContainer } from './FormTab.styles';
import mapChildrenWithProps from '../helpers/mapChildrenWithProps';

class FormTab extends PureComponent {
  renderChildren() {
    const {
      children,
      onSubmitRequest,
      onClearRequest,
      saveFormViewRef,
    } = this.props;
    return mapChildrenWithProps(children, {
      onSubmitRequest,
      onClearRequest,
      saveFormViewRef,
    });
  }

  render() {
    return (
      <FormTabContainer>
        {this.renderChildren()}
      </FormTabContainer>
    );
  }
}

FormTab.defaultProps = {
  onSubmitRequest: null,
  onClearRequest: null,
  saveFormViewRef: null,
};

FormTab.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
  onSubmitRequest: PropTypes.func,
  onClearRequest: PropTypes.func,
  saveFormViewRef: PropTypes.func,
};

export default FormTab;
