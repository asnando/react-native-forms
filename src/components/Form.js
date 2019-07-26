import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  FormContainer,
} from './Form.styles';
import mapChildrenWithProps from '../helpers/mapChildrenWithProps';

const initialState = {
  formData: {},
};

class Form extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  submit() {
    // Check if FormView is valid.
  }

  clear() {

  }

  // This method will be called when form is configured
  // to use tabs and the submit button inside FormView is pressed.
  handleSubmitRequest() {
    console.warn('Form Submit requested!');
  }

  // This method will be called when form is configured
  // to use tabs and the clear button inside FormView is pressed.
  handleClearRequest() {

  }

  // This method may be called from any child when a field got invalid
  // on any submit event.
  handleInvalidField(displayName) {
    if (!!displayName) {
      console.log(`"${displayName}" is invalid`);
    }
  }

  renderForm() {
    const { children } = this.props;
    if (typeof children === 'undefined') {
      // Will render the form from props.
      throw new Error('Render from props not avaiable yet.');
    }
    // Will render the form using children components.
    return mapChildrenWithProps(children, {
      onInvalidField: this.handleInvalidField.bind(this),
      onSubmitRequest: this.handleSubmitRequest.bind(this),
    });
  }

  render() {
    return (
      <FormContainer>
        {this.renderForm()}
      </FormContainer>
    );
  }
}

Form.defaultProps = {
  onSubmit: null,
  onInvalid: null,
  children: undefined,
};

Form.propTypes = {
  onSubmit: PropTypes.func,
  onInvalid: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
};

export default Form;
