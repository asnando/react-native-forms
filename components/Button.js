import React, { Component } from 'react';
import { Button } from 'react-native';

export default class FormButton extends Component {
  _onPress(event) {
    if (typeof this.props.onPress === 'function') {
      this.props.onPress(event);
    }
  }
  render() {
    return <Button
      title={this.props.title}
      onPress={this._onPress.bind(this)}></Button>
  }
}