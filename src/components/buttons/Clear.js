import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
// import { FullWidthButton } from 'rn-custom-button';
import { Button, Text } from 'native-base'

class Clear extends PureComponent {
  render() {
    const {
      title,
      // Call the parent Form component when user press
      // the button and handle the clear request.
      onClearRequest,
      buttonTintColor,
      buttonTextColor,
    } = this.props;
    return (
      <Button
        full
        style={{ backgroundColor: buttonTintColor }}
        onPress={onClearRequest}
      >
        <Text style={{ color: buttonTextColor }}>{title}</Text>
      </Button>
    );
  }
}

Clear.defaultProps = {
  onClearRequest: null,
  buttonTintColor: null,
  buttonTextColor: null,
};

Clear.propTypes = {
  title: PropTypes.string.isRequired,
  onClearRequest: PropTypes.func,
  buttonTintColor: PropTypes.string,
  buttonTextColor: PropTypes.string,
};

export default Clear;
