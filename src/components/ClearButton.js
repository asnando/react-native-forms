import React, { Component } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
} from 'react-native';

export default class ClearButton extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onClear}
        style={[ styles.button, !!this.props.value ? styles.visible : styles.hidden ]} >
        <Text>X</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 0,
  },
  visible: {
    display: 'flex'
  },
  hidden: {
    display: 'none'
  }
});