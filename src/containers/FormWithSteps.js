import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import FormStepView from './FormStepView';
import StepIndicator from '../components/StepIndicator';

const DEFAULT_NEXT_STEP_BUTTON_TITLE  = 'Next';
const DEFAULT_SUBMIT_BUTTON_TITLE     = 'Send';
const DEFAULT_BACK_BUTTON_TITLE       = 'Back';
const DEFAULT_CLOSE_BUTTON_TITLE      = 'Close';

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

  submit() {
    console.log('###');
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
      step.fields.push({
        type: 'submit',
        style: step.nextStepButtonStyle,
        title: isLastTab ? resolveSubmitButtonTitle() : resolveNextStepButtonTitle(),
      });

      map[index.toString()] = () => {
        return <FormStepView
          {...step}
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
          closeForm={this._closeForm.bind(this)} />;
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

  _closeForm() {
    console.log('close!!!');
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