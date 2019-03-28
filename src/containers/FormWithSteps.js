import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import FormStepView from './FormStepView';
import StepIndicator from '../components/StepIndicator';
import { TabView, SceneMap } from 'react-native-tab-view';

const DEFAULT_NEXT_STEP_BUTTON_TITLE  = 'Next';
const DEFAULT_SUBMIT_BUTTON_TITLE     = 'Send';
const DEFAULT_BACK_BUTTON_TITLE       = 'Back';

class FormWithSteps extends Component {

  constructor(props) {
    super(props);
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
        title: step.label
      };
    });
  }

  _onTabSubmit(isLastTab, activeTabForm) {
    this.setState({
      form: Object.assign(this.state.form, activeTabForm)
    }, () => {
      if (isLastTab) {
        console.log('Resolved form:', this.state.form);
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

      step.fields.push({
        type: 'submit',
        style: step.nextStepButtonStyle,
        title: isLastTab ? resolveSubmitButtonTitle() : resolveNextStepButtonTitle(),
      });

      map[index.toString()] = () => {
        return <FormStepView
          {...step}
          backButtonTitle={resolveBackButtonTitle()}
          isLastTab={isLastTab}
          isFirstTab={!index}
          onTabSubmit={this._onTabSubmit.bind(this, isLastTab)}
          requestNextTab={this._requestNextTab.bind(this)}
          requestPreviousTab={this._requestPreviousTab.bind(this)} />;
      };
    });
    return SceneMap(map);
  }

  _requestNextTab() {
    const { index, routes } = this.state;
    if (index < routes.length - 1) {
      this.setState({ index: index + 1 });
    }
  }

  _requestPreviousTab() {
    const { index } = this.state;
    if (index > 0) {
      this.setState({ index: index - 1 });
    }
  }

  _onTabIndexChange(index) {
    return this.setState({ index });
  }

  render() {
    return (
      <View style={styles.container}>
        <TabView
          navigationState={this.state}
          renderScene={this.state.sceneMap}
          onIndexChange={this._onTabIndexChange.bind(this)}
          initialLayout={this.state.tabLayout}
          renderTabBar={ props => null }
          swipeEnabled={false} />
        <StepIndicator {...this.props} currentIndex={this.state.index} />
      </View>
    );
  }

}

export default FormWithSteps;


const styles = StyleSheet.create({
  container: {
    marginTop: 64,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formStep: {
    flex: 1,
    backgroundColor: 'yellow',
    // width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 10,
    borderColor: 'white'
  },
});