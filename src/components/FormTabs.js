import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  TabView,
  SceneMap,
  TabBar,
} from 'react-native-tab-view';
import FormTab from './FormTab';

const initialState = {
  index: 0,
  routes: [],
};

class FormTabs extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      // eslint-disable-next-line react/no-unused-state
      routes: this.transformChildrenToRoutes(),
    };
  }

  handleIndexChange(index) {
    console.log(`Tab index changed: ${index}`);
    // eslint-disable-next-line react/no-unused-state
    return this.setState({ index });
  }

  transformChildrenToRoutes() {
    const { children } = this.props;
    return children.map((child, index) => ({
      key: index.toString(),
      // Note: The "title" property refers to the mounted
      // FormTab component. PropTypes for that case may be missing
      // as it is rendered right here and not in the real component.
      title: child.props.title || '',
    }));
  }

  transformChildrenToSceneMap() {
    const { children } = this.props;
    const map = {};
    // For each child we need to return a function
    // that later will render the real children component.
    // Child component will be inside the FormTab component.
    children.forEach((child, index) => {
      const childKey = index.toString();
      map[childKey] = () => child;
    });
    return SceneMap(map);
  }

  // eslint-disable-next-line class-methods-use-this
  renderTabBar(props) {
    const {
      tabTintColor,
      tabTextColor,
      tabIndicatorColor,
    } = this.props;
    return (
      <TabBar
        style={{
          backgroundColor: tabTintColor,
        }}
        labelStyle={{
          color: tabTextColor,
          fontWeight: 'bold',
        }}
        indicatorStyle={{
          backgroundColor: tabIndicatorColor,
        }}
        {...props}
      />
    );
  }

  render() {
    const { state } = this;
    return (
      <TabView
        navigationState={state}
        renderScene={this.transformChildrenToSceneMap()}
        renderTabBar={(...args) => this.renderTabBar(...args)}
        onIndexChange={(...args) => this.handleIndexChange(...args)}
      />
    );
  }
}

FormTabs.defaultProps = {
  tabTintColor: null,
  tabTextColor: null,
  tabIndicatorColor: null,
};

FormTabs.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  tabTintColor: PropTypes.string,
  tabTextColor: PropTypes.string,
  tabIndicatorColor: PropTypes.string,
};

export default FormTabs;
