import React, { Component } from 'react';
import ModalOptions from './modal/ModalOptions';
import OptionArrow from './modal/OptionArrow';

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  FormTopLabel,
  FormClearButton
} from '../';

const initialState = {
  value:          null,
  options:        null,
  showModal:      false,
  loadingOptions: false,
};

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
  optionWrapper: {
    width: 300,
    height: 75,
    marginBottom: 25,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#d5d5d5'
  },
});