import React, { PureComponent } from 'react';
import { Button } from 'react-native';

export default class FormButton extends PureComponent {
  _onPress(event) {
    if (typeof this.props.onPress === 'function') {
      this.props.onPress(event);
    }
  }
  render() {
    return <Button
      title={this.props.title}
      onPress={this._onPress.bind(this)}
      {...this.props.style}></Button>
  }
}