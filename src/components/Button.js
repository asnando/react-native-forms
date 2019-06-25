import React from 'react';
import PropTypes from 'prop-types';
import { StyledFormButton } from './Button.styles';

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
