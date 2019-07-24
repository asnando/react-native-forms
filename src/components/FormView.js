import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import mapChildrenWithProps from '../helpers/mapChildrenWithProps';
import { FormViewContainer } from './FormView.styles';

class FormView extends PureComponent {
  handleFormFieldValue(name, value) {
    console.log(`${name}: "${value}"`);
  }

  renderChildren() {
    const { children } = this.props;
    return mapChildrenWithProps(children, {
      onFormFieldValue: this.handleFormFieldValue.bind(this),
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

};

FormView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]).isRequired,
};

export default FormView;
