import React, { Component } from 'react';
import {
  Text,
  Modal,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList
} from 'react-native';
import {
  FormTopLabel,
  FormClearButton
} from '../';

const MODAL_HEADER_HEIGHT = 100;

const initialState = {
  showModal: false,
  value: null,
  loadingOptions: false,
  options: null
};

const OptionArrow = (props) => {
  return <Text style={styles.arrowRight}>></Text>;
}

const ModalHeader = (props) => {
  return (
    <SafeAreaView style={styles.modalHeader}>
      <Text style={styles.modalHeaderTitle}>{props.title}</Text>
      <TouchableOpacity style={styles.closeButton} onPress={props.hideModal}></TouchableOpacity>
    </SafeAreaView>
  );
}

const ModalContent = (props) => {
  return <FlatList
    data={props.options}
    renderItem={
      ({item}) => {
        return <TouchableOpacity
          style={[styles.modalOption]}
          onPress={props.onOptionSelected.bind(props.onOptionSelected, item.value)}>
          <Text style={styles.modalOptionLabel}>{item.label}</Text>
        </TouchableOpacity>;
      }
    }
    keyExtractor={(item, index) => index.toString()} />;
}

const ModalLoader = (props) => {
  return (
    <View style={[ styles.container, styles.modalLoader ]}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const ModalOptions = (props) => {
  return (
    <Modal animationType="slide" visible={props.showModal} onShow={props.onShow}>
      <ModalHeader title={props.title} hideModal={props.hideModal} />
      {
        props.loadingOptions
        ? <ModalLoader  />
        : <ModalContent options={props.options} onOptionSelected={props.onOptionSelected} />
      }
    </Modal>
  );
}

export default class FormOption extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  getValue() {
    return this.state.value;
  }
  clearValue() {
    return this.setState({ value: null });
  }
  getLabelValue() {
    const { value } = this.state;
    if (value === null) return '';
    switch (typeof value) {
      case 'undefined':
        return '';
      case 'string': 
        return value;
      default:
        return value.toString();
    };
  }
  _onShow() {
    if (typeof this.props.onFieldEnter === 'function') {
      this.props.onFieldEnter(this.props.name);
    }
    if (typeof this.props.options === 'function') {
      this._getOptionsFromProvider().then(options => {
        this.setState({
          options,
          loadingOptions: false
        });
      });
    }
  }
  _getOptionsFromProvider() {
    return new Promise((resolve, reject) => {
      let provider = this.props.options();
      if (provider instanceof Promise) {
        provider
        .then(options => resolve(options))
        .catch(error => {
          console.log(error);
        });
      } else {
        resolve(provider);
      }
    });
  }
  show() {
    this.setState({
      showModal: true,
      // When options is a function, shows the screen loader.
      loadingOptions: typeof this.props.options === 'function'
    });
  }
  hide() {
    this.setState({
      showModal: false,
      options: null
    });
  }
  onOptionSelected(value) {
    // Call next field on form (from parent).
    if (typeof this.props.nextField === 'function') {
      this.props.nextField();
    }
    this.setState({ value });
    this.hide();
  }
  render() {
    return (
      <View>
        <ModalOptions
          showModal={this.state.showModal}
          hideModal={this.hide.bind(this)}
          onShow={this._onShow.bind(this)}
          onOptionSelected={this.onOptionSelected.bind(this)}
          options={this.state.options || this.props.options}
          title={this.props.title}
          loadingOptions={this.state.loadingOptions} />
        <TouchableOpacity style={styles.optionWrapper} onPress={this.show.bind(this)}>
          <FormTopLabel label={this.props.title}></FormTopLabel>
          <Text>{this.getLabelValue()}</Text>
          <OptionArrow />
          <FormClearButton onClear={this.clearValue.bind(this)} value={this.getLabelValue()} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  modalHeader: {
    height: MODAL_HEADER_HEIGHT,
    backgroundColor: '#fff',
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
  closeButton: {
    marginRight: 16,
    width: 32,
    height: 32,
    backgroundColor: '#ccc'
  },
  modalOption: {
    width: '100%',
    height: 80,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
  },
  modalOptionLabel: {
    fontSize: 18,
    marginLeft: 16,
  },
  optionWrapper: {
    width: 300,
    height: 75,
    marginBottom: 25,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#d5d5d5'
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  arrowRight: {
    position: 'absolute',
    right: 10,
    fontSize: 24,
    color: '#aaa'
  },
});