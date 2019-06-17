import React, { Component } from 'react';
import { StyleSheet, Keyboard } from 'react-native';
import { TabView, SceneMap, TabBar, PagerPan } from 'react-native-tab-view';
import FormView from './FormView';
import { formTabStyle } from './FormTab.styles';

const initialState = {
  index: 0,
  routes: [],
};

export default class FormTab extends Component {

  constructor(props) {
    super(props);
    const { tabs } = props;
    this.tabs = [];
    this.state = {
      ...initialState,
      routes: tabs.map((tab, tabIndex) => {
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

  _onIndexChange(index) {
    // Prevent keyboard from being open after tab transition.
    Keyboard.dismiss();
    this.setState({ index });
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

  _renderPager = props => <PagerPan {...props} />

  render() {
    return (
      <TabView
        style={formTabStyle}
        navigationState={this.state}
        onIndexChange={this._onIndexChange.bind(this)}
        renderTabBar={this._renderTabBar.bind(this)}
        renderPager={this._renderPager.bind(this)}
        renderScene={this._renderScene.bind(this)} />
    );
  }
}
