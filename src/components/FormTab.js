import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormTabContainer } from './FormTab.styles';

class FormTab extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <FormTabContainer>
        {children}
      </FormTabContainer>
    );
  }
}

FormTab.defaultProps = {

};

FormTab.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
};

export default FormTab;
