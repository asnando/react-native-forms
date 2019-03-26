import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native';

const ModalContent = (props) => {
  // When options are not loaded yet, shows the
  // loader on the top of modal. Otherwise the loader
  // will be displayed at the bottom.
  if (!props.options.length) {
    return null;
  }
  
  return (
    <FlatList
      data={props.options}
      renderItem={
        ({item}) => {
          return <TouchableOpacity
            style={[styles.modalOption]}
            onPress={props.onOptionSelected.bind(props.onOptionSelected, item.value)}>
            <Text style={styles.modalOptionLabel}>{item.label}</Text>
          </TouchableOpacity>
        }
      }
      onEndReached={props.onNextPage}
      keyExtractor={(item, index) => index.toString()} />
  );
}

export default ModalContent;

const styles = StyleSheet.create({
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
});