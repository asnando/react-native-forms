import React, { Component } from 'react';
import { StyleSheet, Keyboard, View, Text, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar, PagerPan } from 'react-native-tab-view';
import FormView from './FormView';

const initialState = {
  index: 0,
  routes: [],
}

export default class FormTab extends Component {

  constructor(props) {
    super(props);
    this.tabs = [];
    this.state = {
      ...initialState,
      routes: this.props.tabs.map((tab, tabIndex) => {
        return { key: tabIndex.toString(), title: tab.title }
      })
    };
  }

  _createSceneMap() {
    let map = {};
    this.props.tabs.map((tab, tabIndex) => {
      map[tabIndex.toString()] = (props) => {
        props = {...this.props, ...tab};
        return <FormView {...props} ref={(r) => this.tabs[tabIndex] = r} />;
      }
    });
    return map;
  }

  _onIndexChange = (index) => {
    // Prevent keyboard from being open after tab transition.
    Keyboard.dismiss();
    this.setState({ index })
  }

  _renderTabBar = props => {
    return <TabBar
      style={{ borderRadius: 8 }}
      indicatorStyle={{ display: 'none' }}
      {...props} />;
  }

  _renderScene = SceneMap(this._createSceneMap())

  getValue() {
    const tab = this.tabs[this.state.index];
    if (tab && typeof tab.getValue === 'function') {
      return tab.getValue();
    } else {
      return {};
    }
  }

  submit() {
    const tab = this.tabs[this.state.index];
    if (tab && typeof tab.submit === 'function') tab.submit();
  }

  clear() {
    const tab = this.tabs[this.state.index];
    if (tab && typeof tab.clear === 'function') tab.clear();
  }

  _renderPager = (props) => <PagerPan {...props} />

  render() {
    return (
      <TabView
        style={styles.formTab}
        navigationState={this.state}
        onIndexChange={this._onIndexChange}
        renderTabBar={this._renderTabBar}
        renderPager={this._renderPager}
        renderScene={this._renderScene} />
    );
  }

}

const styles = StyleSheet.create({
  formTab: {
    flex: 1,
  }
});

// tabStyle: style object for the individual tabs in the tab bar.
// indicatorStyle: style object for the active indicator.
// labelStyle: style object for the tab item label.
// style: style object for the tab bar.