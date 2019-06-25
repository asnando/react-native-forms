import React from 'react';
import { StyledFormButton } from './Button.styles';
import PropTypes from 'prop-types';

const FormButton = (props) => {
  const { title, onPress } = props;
  return (
    <StyledFormButton title={title} onPress={onPress} />
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
