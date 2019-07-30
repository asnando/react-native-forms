import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FullWidthButton } from 'rn-custom-button';

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
      <FullWidthButton
        title={title}
        onPress={onClearRequest}
        buttonTintColor={buttonTintColor}
        buttonTextColor={buttonTextColor}
      />
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
