import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  TabView,
  SceneMap,
  TabBar,
} from 'react-native-tab-view';
import mapChildrenWithProps from '../helpers/mapChildrenWithProps';

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
    // Save the FormViews reference.
    this.formViews = [];
    // Creates the SceneMap used by react-native-tab-view.
    this.sceneMap = this.transformChildrenToSceneMap();
  }

  componentDidMount() {
    // Save this component reference on parent. This is necessary
    // cuz when using form with tabs it can be manually called by a
    // custom button press which directly fires the Form 'submit' method.
    const { saveFormTabsRef } = this.props;
    saveFormTabsRef(this);
  }

  getActiveFormView() {
    const { formViews } = this;
    const { index } = this.state;
    return formViews[index];
  }

  getActiveFormViewData() {
    const activeView = this.getActiveFormView();
    return activeView.getValues();
  }

  // Save FormView children components refs.
  saveFormViewRef(ref) {
    this.formViews.push(ref);
  }

  handleIndexChange(index) {
    // eslint-disable-next-line react/no-unused-state
    return this.setState({ index });
  }

  isActiveFormViewValid() {
    const activeView = this.getActiveFormView();
    return activeView.validate();
  }

  whichActiveFormViewFieldIsInvalid() {
    const activeView = this.getActiveFormView();
    return activeView.whichFormFieldIsInvalid();
  }

  // Intercetps the submit request as it is the only component
  // which knows which tab is active. So we get the values from
  // the current displayed FormView and pass it back to the Form(parent).
  handleSubmitRequest() {
    console.log('FormTabs.handleSubmitRequest()');
    const { onInvalidField, onSubmitRequest } = this.props;
    if (!this.isActiveFormViewValid()) {
      // call onInvalidRequest props.
      onInvalidField(this.whichActiveFormViewFieldIsInvalid());
    } else {
      onSubmitRequest(this.getActiveFormViewData());
    }
  }

  // Like handleSubmitRequest, it will intercept the clear request
  // from inside the FormView and will clear only the current active
  // FormView fields.
  handleClearRequest() {
    console.log('FormTabs.handleClearRequest()');
    return this.getActiveFormView().clear();
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
    const {
      children,
      onInvalidField,
    } = this.props;
    const map = {};
    // For each child we need to return a function
    // that later will render the real children component.
    // Child component will be inside the FormTab component.
    children.forEach((child, index) => {
      const childKey = index.toString();
      map[childKey] = () => mapChildrenWithProps(child, {
        // Pass down props to children
        onSubmitRequest: this.handleSubmitRequest.bind(this),
        onClearRequest: this.handleClearRequest.bind(this),
        onInvalidField,
        saveFormViewRef: this.saveFormViewRef.bind(this),
      });
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
    const { state, sceneMap } = this;
    return (
      <TabView
        navigationState={state}
        renderScene={sceneMap}
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
  onSubmitRequest: null,
  onClearRequest: null,
  onInvalidField: null,
  saveFormTabsRef: null,
};

FormTabs.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  tabTintColor: PropTypes.string,
  tabTextColor: PropTypes.string,
  tabIndicatorColor: PropTypes.string,
  onSubmitRequest: PropTypes.func,
  onClearRequest: PropTypes.func,
  onInvalidField: PropTypes.func,
  saveFormTabsRef: PropTypes.func,
};

export default FormTabs;
