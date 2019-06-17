import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, PagerPan, TabBar } from 'react-native-tab-view';
import FormStepView from './FormStepView';
import StepIndicator from '../components/StepIndicator';
import {
  FormWithStepsContainer,
  tabViewStyle,
} from './FormWithSteps.styles';

const DEFAULT_NEXT_STEP_BUTTON_TITLE = 'Next';
const DEFAULT_SUBMIT_BUTTON_TITLE = 'Send';
const DEFAULT_BACK_BUTTON_TITLE = 'Back';
const DEFAULT_CLOSE_BUTTON_TITLE = 'Close';

class FormWithSteps extends Component {

  constructor(props) {
    super(props);
    // Save reference to the steps components inside the tabs container.
    this.steps = {};
    // 
    this.state = {
      index: 0,
      routes: this._createRoutesFromProps(),
      sceneMap: this._createSceneMap(),
      tabLayout: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
      form: {}
    };
  }

  _createRoutesFromProps() {
    return this.props.steps.map((step, index) => {
      return {
        key: index.toString(),
        title: 'Step'.concat(index.toString())
      };
    });
  }

  _onTabSubmit(isLastTab, activeTabForm) {
    this.setState({
      form: Object.assign(this.state.form, activeTabForm)
    }, () => {
      if (isLastTab) {
        // Call parent onSubmit function which will
        // resolve this form value to whom called it.
        if (typeof this.props.onSubmit === 'function') {
          this.props.onSubmit(this.state.form);
        }
      } else {
        this._requestNextTab();
      }
    });
  }

  _createSceneMap() {
    const map = {};
    const props = this.props;
    this.props.steps.map((step, index, self) => {

      const isLastTab = index >= self.length - 1;

      function resolveNextStepButtonTitle() {
        return step.nextStepButtonTitle || props.nextStepButtonTitle
          || DEFAULT_NEXT_STEP_BUTTON_TITLE;
      }

      function resolveSubmitButtonTitle() {
        return props.submitButtonTitle || DEFAULT_SUBMIT_BUTTON_TITLE;
      }

      function resolveBackButtonTitle() {
        return props.backButtonTitle || DEFAULT_BACK_BUTTON_TITLE;
      }

      function resolveCloseButtonTitle() {
        return props.closeButtonTitle || DEFAULT_CLOSE_BUTTON_TITLE;
      }

      // Adds button to submit each part of the form.
      const alreadyHaveSubmitButton = !!step.fields.find(f => /submit/.test(f.type));
      if (!alreadyHaveSubmitButton) {
        step.fields.push({
          type: 'submit',
          style: step.nextStepButtonStyle,
          title: isLastTab ? resolveSubmitButtonTitle() : resolveNextStepButtonTitle(),
        });
      }

      const indexAsString = index.toString();

      map[indexAsString] = () => {
        return <FormStepView
          {...step}
          ref={r => this.steps[indexAsString] = r}
          canClose={this.props.canClose || false}
          closeButtonTitle={resolveCloseButtonTitle()}
          backButtonTitle={resolveBackButtonTitle()}
          isLastTab={isLastTab}
          isFirstTab={!index}
          invalidStyle={this.props.invalidStyle}
          validStyle={this.props.validStyle}
          onTabSubmit={this._onTabSubmit.bind(this, isLastTab)}
          onInvalid={this.props.onInvalid}
          onCloseRequest={this.props.onCloseRequest}
          requestNextTab={this._requestNextTab.bind(this)}
          requestPreviousTab={this._requestPreviousTab.bind(this)}
          // shouldShowField={this._shouldShowField.bind(this)}
          />;
      };
    });
    return SceneMap(map);
  }

  _requestNextTab() {
    const { index, routes } = this.state;
    if (index < routes.length - 1) {
      this._onTabLeave(index);
      this.setState({ index: index + 1 }, () => {
        this._onTabActive(this.state.index);
      });
    }
  }

  _requestPreviousTab() {
    const { index } = this.state;
    if (index > 0) {
      this._onTabLeave(index);
      this.setState({ index: index - 1 }, () => {
        this._onTabActive(this.state.index);
      });
    }
  }

  _onTabLeave(index) {
    this.steps[index].onStepLeave();
  }

  _onTabActive(index) {
    // called from the tab navigation requests.
    // Trigger the "onStepActive" method of the "FormStepView" component.
    this.steps[index].onStepActive();
  }

  _onTabIndexChange(index) {
    return this.setState({ index });
  }

  // Fix: On Android the tabs content are only showed
  // using the "renderPager" method.
  _renderPager = (props) => <PagerPan {...props} />

  render() {
    return (
      <FormWithStepsContainer>
        <TabView
          style={tabViewStyle}
          navigationState={this.state}
          renderScene={this.state.sceneMap}
          renderPager={this._renderPager}
          onIndexChange={this._onTabIndexChange.bind(this)}
          initialLayout={this.state.tabLayout}
          renderTabBar={ props => null }
          swipeEnabled={false} />
        <StepIndicator {...this.props} currentIndex={this.state.index} />
      </FormWithStepsContainer>
    );
  }

}

export default FormWithSteps;
