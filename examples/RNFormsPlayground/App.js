import React, { Fragment } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WithView from './withView';
import WithTabs from  './withTabs';
import WithSteps from './withSteps';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <WithView />
      {/* <WithTabs /> */}
      {/* <WithSteps /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
});

export default App;
