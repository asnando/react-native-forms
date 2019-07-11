import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
// import {} from 'react-native-forms';

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Text>RNFormsPlayGround</Text>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
