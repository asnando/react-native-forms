import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FullWidthButton } from 'rn-custom-button';

class Submit extends PureComponent {
  render() {
    const {
      title,
      // Call the parent Form component when user press
      // the button and handle the submit request.
      onSubmitRequest,
      buttonTintColor,
      buttonTextColor,
    } = this.props;
    return (
      <FullWidthButton
        title={title}
        onPress={onSubmitRequest}
        buttonTintColor={buttonTintColor}
        buttonTextColor={buttonTextColor}
      />
    );
  }
}

Submit.defaultProps = {
  onSubmitRequest: null,
  buttonTintColor: null,
  buttonTextColor: null,
};

Submit.propTypes = {
  title: PropTypes.string.isRequired,
  onSubmitRequest: PropTypes.func,
  buttonTintColor: PropTypes.string,
  buttonTextColor: PropTypes.string,
};

export default Submit;
