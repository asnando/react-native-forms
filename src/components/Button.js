import React from 'react';
import { FullWidthButton } from 'react-native-custom-button';
import PropTypes from 'prop-types';

const FormButton = (props) => {
  const { title, onPress } = props;
  return (
    <FullWidthButton title={title} onPress={onPress} />
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
