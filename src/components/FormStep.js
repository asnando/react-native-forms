import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class FormStep extends PureComponent {
  render() {
    const { children } = this.props;
    return children;
  }
}

FormStep.defaultProps = {

};

FormStep.propTypes = {

};

export default FormStep;
