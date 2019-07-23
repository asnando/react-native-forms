import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  FormContainer,
} from './Form.styles';

const initialState = {
  formData: {},
};

class Form extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  renderForm() {
    const { children } = this.props;
    if (typeof children === 'undefined') {
      // Will render the form from props.
      throw new Error('Render from props not avaiable yet.');
    }
    // Will render the form using children components.
    return children;
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
  onInvalidField: null,
  children: undefined,
};

Form.propTypes = {
  onSubmit: PropTypes.func,
  onInvalidField: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
};

export default Form;
