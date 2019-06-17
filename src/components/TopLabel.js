import React, { PureComponent } from 'react';
import { Text, StyleSheet } from 'react-native';

class TopLabel extends PureComponent {
  render() {
    return <Text ref={r => this.label = r} style={[styles.topLabel, this.props.style]}>
      {this.props.label}
    </Text>
  }
}

export default TopLabel;

const styles = StyleSheet.create({
  topLabel: {
    position: 'absolute',
    top: 0,
    left: 0,
    fontSize: 18
  },
});