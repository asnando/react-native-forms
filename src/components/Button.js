import React from 'react';
import PropTypes from 'prop-types';
import { StyledFormButton } from './Button.styles';

const FormButton = (props) => {
  const {
    title,
    onPress,
    buttonTintColor,
    buttonTextColor,
  } = props;

  return (
    <StyledFormButton
      title={title}
      onPress={onPress}
      buttonTintColor={buttonTintColor}
      buttonTextColor={buttonTextColor}
    />
  );
};
FormButton.defaultProps = {
  title: '',
};

FormButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};

export default FormButton;
