import React, { PureComponent, Fragment, Children, cloneElement } from 'react';
import PropTypes from 'prop-types';
import {
  TabView,
  SceneMap,
} from 'react-native-tab-view';
import mapChildrenWithProps from '../helpers/mapChildrenWithProps';
import FormStepIndicator from './FormStepIndicator';

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
    const { routes } = this.state;
    const { children, onInvalidField } = this.props;
    const routesSize = routes.length;
    const map = {};
    // For each child we need to return a function
    // that later will render the real children component.
    // Child component will be inside the FormStep component.
    children.forEach((child, index) => {
      const childKey = index.toString();
      const isFirstStep = !index;
      const isLastStep = index === routesSize - 1;
      map[childKey] = () => mapChildrenWithProps(child, {
        onNextStepRequest: this.handleNextStepRequest.bind(this),
        onPreviousStepRequest: this.handlePreviousStepRequest.bind(this),
        onSubmitRequest: this.handleSubmitRequest.bind(this),
        onInvalidField,
        isFirstStep,
        isLastStep,
      });
      // map[childKey] = () => Children.map(child, (_child) => {
      //   return cloneElement(_child, {
      //     onNextStepRequest: this.handleNextStepRequest.bind(this),
      //     onPreviousStepRequest: this.handlePreviousStepRequest.bind(this),
      //     onSubmitRequest: this.handleSubmitRequest.bind(this),
      //     onInvalidField,
      //     isFirstStep,
      //     isLastStep,
      //   });
      // });
    });
    return new SceneMap(map);
  }

  handleIndexChange(index) {
    console.log(`Form steps handle index change: ${index}`);
    // eslint-disable-next-line react/no-unused-state
    return this.setState({ index });
  }

  handleNextStepRequest() {
    const { index, routes } = this.state;
    const routesSize = routes.length;
    if (index < routesSize - 1) {
      this.handleIndexChange(index + 1);
    }
  }

  handlePreviousStepRequest() {
    const { index } = this.state;
    if (index > 0) {
      this.handleIndexChange(index - 1);
    }
  }

  handleSubmitRequest() {
    console.warn('requested to submit');
  }

  render() {
    const { state } = this;
    const { index: activeIndex, routes } = state;
    const { indicatorColor } = this.props;
    return (
      <Fragment>
        <TabView
          navigationState={state}
          renderScene={this.transformChildrenToSceneMap()}
          renderTabBar={() => null}
          onIndexChange={(...args) => this.handleIndexChange(...args)}
          swipeEnabled={false}
        />
        <FormStepIndicator
          stepsSize={routes.length}
          activeIndex={activeIndex}
          indicatorColor={indicatorColor}
        />
      </Fragment>
    );
  }
}

FormSteps.defaultProps = {
  onInvalidField: null,
  indicatorColor: null,
};

FormSteps.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  onInvalidField: PropTypes.func,
  indicatorColor: PropTypes.string,
};

export default FormSteps;
