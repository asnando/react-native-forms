import React, { Component } from 'react';
import { StyleSheet, Keyboard } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import {
  FormView
} from '../';

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
    return <TabBar {...props} />;
  }

  _renderScene = SceneMap(this._createSceneMap())

  submit() {
    const tab = this.tabs[this.state.index];
    if (tab && typeof tab.submit === 'function') tab.submit();
  }

  clear() {
    const tab = this.tabs[this.state.index];
    if (tab && typeof tab.clear === 'function') tab.clear();
  }

  render() {
    return (
      <TabView
        navigationState={this.state}
        onIndexChange={this._onIndexChange}
        renderTabBar={this._renderTabBar}
        renderScene={this._renderScene} />
    );
  }

}

const styles = StyleSheet.create({
  formTab: {
    flex: 1
  }
});

// tabStyle: style object for the individual tabs in the tab bar.
// indicatorStyle: style object for the active indicator.
// labelStyle: style object for the tab item label.
// style: style object for the tab bar.