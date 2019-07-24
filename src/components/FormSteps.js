import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  TabView,
  SceneMap,
} from 'react-native-tab-view';
import FormStep from './FormStep';

const initialState = {
  index: 0,
  routes: [],
};

class FormSteps extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      // eslint-disable-next-line react/no-unused-state
      routes: this.transformChildrenToRoutes(),
    };
  }

  transformChildrenToRoutes() {
    const { children } = this.props;
    return children.map((child, index) => ({
      key: index.toString(),
      title: index.toString(),
    }));
  }

  transformChildrenToSceneMap() {
    const { children } = this.props;
    const map = {};
    // For each child we need to return a function
    // that later will render the real children component.
    // Child component will be inside the FormStep component.
    children.forEach((child, index) => {
      const childKey = index.toString();
      map[childKey] = () => (
        <FormStep>{child}</FormStep>
      );
    });
    return new SceneMap(map);
  }

  handleIndexChange(index) {
    console.log(`Form steps handle index change: ${index}`);
    // eslint-disable-next-line react/no-unused-state
    return this.setState({ index });
  }

  render() {
    const { state } = this;
    return (
      <TabView
        navigationState={state}
        renderScene={this.transformChildrenToSceneMap()}
        renderTabBar={() => null}
        onIndexChange={(...args) => this.handleIndexChange(...args)}
        swipeEnabled={false}
      />
    );
  }
}

FormSteps.defaultProps = {

};

FormSteps.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};

export default FormSteps;
