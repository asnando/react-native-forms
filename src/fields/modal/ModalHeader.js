import React from 'react';
import {
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const MODAL_HEADER_HEIGHT = 100;

const ModalHeader = (props) => {
  return (
    <SafeAreaView style={styles.modalHeader}>
      <Text style={styles.modalHeaderTitle}>{props.title}</Text>
      <TouchableOpacity style={styles.closeButton} onPress={props.hideModal}></TouchableOpacity>
    </SafeAreaView>
  );
}

export default ModalHeader;

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
  }
});