import React from 'react';
import { Button } from 'react-native-custom-button';

const FormButton = (props) => {
  return <Button title={props.title} onPress={props.onPress} style={props.style} />
}

export default FormButton;