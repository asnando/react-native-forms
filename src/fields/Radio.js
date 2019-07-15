import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';

class Radio extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      value: props.options[0].value
    };
  }

  getValue() {
    return this.state.value;
  }

  _onSelectedRadioValue(options) {
    const selected = options.find(opt => opt.selected);
    const value = selected.value || selected.label;
    this.setState({ value });
  }

  render() {
    return (
      <View style={styles.radioButtonContainer}>
        <RadioGroup
          radioButtons={this.props.options}
          onPress={this._onSelectedRadioValue.bind(this)}
          flexDirection='row' />
      </View>
    );
  }
}

export default Radio;

const styles = StyleSheet.create({
  radioButtonContainer: {
    marginBottom: 16,
  }
});