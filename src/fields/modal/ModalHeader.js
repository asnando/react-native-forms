import React from 'react';
import { SafeAreaView, TouchableOpacity, StyleSheet, TextInput, } from 'react-native';

const MODAL_HEADER_HEIGHT = 100;

class ModalHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  onInputValue(value) {
    this.setState({ text: value });
    this.onInputValueChange(value, this.state.text);
  }

  onClearValue() {
    this.setState({ text: '' });
    this.onInputValueChange(null, this.state.text);
  }

  onInputValueChange(value, prevValue) {
    if (value == prevValue) return;
    if (typeof this.props.onInputValue === 'function') {
      console.log(this.props.onInputValue);
      this.props.onInputValue(value);
    }
  }

  hasValidText() {
    return !!this.state.text.replace(/\s/g, '');
  }

  render() {
    return (
      <SafeAreaView style={styles.modalHeader}>
        <TouchableOpacity style={styles.closeButton} onPress={this.props.hideModal} />
        <TextInput
          style={[
            styles.modalHeaderSearchBox,
            { display: !this.props.showFilterInput ? 'none' : 'flex'}
          ]}
          value={this.state.text}
          onChangeText={this.onInputValue.bind(this)} />
        { !this.hasValidText() ? null
            : <TouchableOpacity style={styles.clearButton} onPress={this.onClearValue.bind(this)} />
        }
      </SafeAreaView>
    );
  }
}

export default ModalHeader;

const styles = StyleSheet.create({
  modalHeader: {
    height: MODAL_HEADER_HEIGHT,
    backgroundColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#d5d5d5'
  },
  modalHeaderTitle: {
    flex: 1,
    fontSize: 24,
    marginLeft: 16,
  },
  modalHeaderSearchBox: {
    backgroundColor: '#fff',
    width: 250,
    height: 32,
    marginRight: 16,
    marginLeft: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  closeButton: {
    marginLeft: 16,
    width: 32,
    height: 32,
    backgroundColor: '#ccc'
  },
  clearButton: {
    marginRight: 16,
    width: 32,
    height: 32,
    backgroundColor: '#ccc'
  }
});