import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormViewContainer } from './FormView.styles';

class FormView extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <FormViewContainer>
        {children}
      </FormViewContainer>
    );
  }
}

FormView.defaultProps = {

};

FormView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
};

export default FormView;
