import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  TabView,
  SceneMap,
} from 'react-native-tab-view';
import mapChildrenWithProps from '../helpers/mapChildrenWithProps';
import FormStepIndicator from './FormStepIndicator';
import FormStep from './FormStep';

const initialState = {
  index: 0,
  routes: [],
  formData: {},
};

class FormSteps extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
      // eslint-disable-next-line react/no-unused-state
      routes: this.transformChildrenToRoutes(),
    };
    // Save the formViews reference with the same step index.
    this.formViews = [];
    // Creates the SceneMap used by the react-native-tab-view.
    this.sceneMap = this.createSceneMap();
  }

  getActiveFormView() {
    const { formViews } = this;
    const { index } = this.state;
    return formViews[index];
  }

  getLastActiveFormView() {
    const { formViews } = this;
    const { index } = this.state;
    return formViews[index - 1];
  }

  // Every FormView component rendered inside this children
  // list will save the reference directly inside this class instance.
  // So when user makes any action with the form like submit, clear, request next
  // step this class will manage it.
  saveFormViewRef(ref) {
    this.formViews.push(ref);
  }

  transformChildrenToRoutes() {
    const { children, steps } = this.props;
    return (children || steps).map((child, index) => ({
      key: index.toString(),
      title: index.toString(),
    }));
  }

  getChildrenCommonProps() {
    const {
      onInvalidField,
      backButtonText,
      nextStepButtonText,
      buttonTintColor,
      buttonTextColor,
      submitButtonText,
    } = this.props;
    return {
      onNextStepRequest: this.handleNextStepRequest.bind(this),
      onPreviousStepRequest: this.handlePreviousStepRequest.bind(this),
      onSubmitRequest: this.handleSubmitRequest.bind(this),
      saveFormViewRef: this.saveFormViewRef.bind(this),
      onInvalidField,
      // isFirstStep,
      // isLastStep,
      backButtonText,
      nextStepButtonText,
      buttonTintColor,
      buttonTextColor,
      submitButtonText,
    };
  }

  createSceneMap() {
    const { children, steps } = this.props;
    if (children) {
      return this.transformChildrenToSceneMap();
    }
    if (steps) {
      return this.transformStepsPropsToSceneMap();
    }
    return null;
  }

  transformStepsPropsToSceneMap() {
    const { props } = this;
    const { routes } = this.state;
    const { steps } = props;
    const routesSize = routes.length;
    const childrenProps = this.getChildrenCommonProps();
    const map = {};
    steps.forEach((step, index) => {
      const childKey = index.toString();
      const isFirstStep = !index;
      const isLastStep = index === routesSize - 1;
      map[childKey] = () => (
        <FormStep
          {...step}
          {...childrenProps}
          isFirstStep={isFirstStep}
          isLastStep={isLastStep}
        />
      );
    });
    return SceneMap(map);
  }

  transformChildrenToSceneMap() {
    const { routes } = this.state;
    const { children } = this.props;
    const routesSize = routes.length;
    const map = {};
    const childrenProps = this.getChildrenCommonProps();
    // For each child we need to return a function
    // that later will render the real children component.
    // Child component will be inside the FormStep component.
    children.forEach((child, index) => {
      const childKey = index.toString();
      const isFirstStep = !index;
      const isLastStep = index === routesSize - 1;
      map[childKey] = () => mapChildrenWithProps(child, {
        ...childrenProps,
        isFirstStep,
        isLastStep,
      });
    });
    return SceneMap(map);
  }

  handleIndexChange(index) {
    return this.setState({ index });
  }

  moveToNextStep() {
    const { index, routes } = this.state;
    const routesSize = routes.length;
    if (index < routesSize - 1) {
      this.handleIndexChange(index + 1);
    }
  }

  moveToPreviousStep() {
    const { index } = this.state;
    if (index > 0) {
      this.handleIndexChange(index - 1);
    }
  }

  addActiveFormViewValuesToStateFormData(callback) {
    const activeView = this.getActiveFormView();
    return this.setState(prevState => ({
      ...prevState,
      formData: {
        ...prevState.formData,
        ...activeView.getValues(),
      },
    }), callback);
  }

  removeActiveFormViewValuesFromStateFormData(callback) {
    const activeView = this.getActiveFormView();
    const activeViewFormData = activeView.getValues();
    const activeViewFormDataKeys = Object.keys(activeViewFormData);
    return this.setState((prevState) => {
      const { formData } = prevState;
      activeViewFormDataKeys.forEach(key => delete formData[key]);
      return {
        ...prevState,
        formData,
      };
    }, callback);
  }

  isActiveFormViewValid() {
    const activeView = this.getActiveFormView();
    return activeView.validate();
  }

  whichActiveFormViewFieldIsInvalid() {
    const activeView = this.getActiveFormView();
    return activeView.whichFormFieldIsInvalid();
  }

  handleNextStepRequest() {
    const { onInvalidField } = this.props;
    if (!this.isActiveFormViewValid()) {
      onInvalidField(this.whichActiveFormViewFieldIsInvalid());
    } else {
      this.addActiveFormViewValuesToStateFormData();
      this.moveToNextStep();
    }
  }

  handlePreviousStepRequest() {
    this.removeActiveFormViewValuesFromStateFormData();
    this.moveToPreviousStep();
  }

  // Called from the FormView inside the children components.
  // Pass it up to the Form component callback.
  handleSubmitRequest() {
    const { onSubmitRequest, onInvalidField } = this.props;
    if (!this.isActiveFormViewValid()) {
      onInvalidField(this.whichActiveFormViewFieldIsInvalid());
    } else {
      this.addActiveFormViewValuesToStateFormData(() => {
        const { formData } = this.state;
        onSubmitRequest(formData);
      });
    }
  }

  render() {
    const { state, sceneMap } = this;
    const { index: activeIndex, routes } = state;
    const { indicatorColor } = this.props;
    return (
      <Fragment>
        <TabView
          navigationState={state}
          renderScene={sceneMap}
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
  children: null,
  steps: null,
  onSubmitRequest: null,
  onInvalidField: null,
  indicatorColor: null,
  // FormStep component props.
  backButtonText: null,
  nextStepButtonText: null,
  buttonTintColor: null,
  buttonTextColor: null,
  submitButtonText: null,
};

FormSteps.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
  steps: PropTypes.array,
  onSubmitRequest: PropTypes.func,
  onInvalidField: PropTypes.func,
  indicatorColor: PropTypes.string,
  // FormStep component props.
  backButtonText: PropTypes.string,
  nextStepButtonText: PropTypes.string,
  buttonTintColor: PropTypes.string,
  buttonTextColor: PropTypes.string,
  submitButtonText: PropTypes.string,
};

export default FormSteps;
