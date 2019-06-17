import React from 'react';
import { Button } from 'react-native-custom-button';
import PropTypes from 'prop-types';

const FormButton = (props) => {
  const { title, onPress } = props;
  return (
    <Button title={title} onPress={onPress} />
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
