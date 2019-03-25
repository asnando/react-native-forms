import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const ModalLoader = (props) => {
  return (
    <View style={[ styles.container, styles.modalLoader ]}>
      <ActivityIndicator size="large" />
    </View>
  );
}

export default ModalLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
});