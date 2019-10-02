import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import { FullWidthButton } from 'rn-custom-button';
import { Button, Text } from 'native-base'

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
      <Button
        full
        style={{ backgroundColor: buttonTintColor }}
        onPress={() => onSubmitRequest()}

      >
        <Text style={{ color: buttonTextColor }}>{title}</Text>
      </Button>
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
