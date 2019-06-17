import React, { PureComponent, Component } from 'react';
import { StyleSheet, View, Button, Text, Keyboard } from 'react-native';
import FormView from './FormView';

class FormStepView extends Component {

  // We create the state within fields in order to support
  // the "showWhen" feature seted inside the field object configuration.
  constructor(props) {
    super(props);
    this.state = {
      fields: [...this.props.fields]
    };
  }

  onStepActive() {
    // this.setState({
    //   fields: this.props.fields.filter(field => 
    //     !field.showWhen ? true : this.props.shouldShowField(field))
    // }, () => {
    //   console.log(this.state.fields);
    // });
  }

  onStepLeave() {
    return Keyboard.dismiss();
  }

  render() {
    return (
      <View style={styles.formStepViewContainer}>
        {/* Top Icons */}
        <View style={styles.formStepViewTopContainer}>
          { this.props.isFirstTab
            ? 
              this.props.canClose
                ? <Button title={this.props.closeButtonTitle} onPress={this.props.onCloseRequest}></Button>
                : null
            : <Button title={this.props.backButtonTitle} onPress={this.props.requestPreviousTab}></Button>
          }
        </View>
        {/* Title */}
        <View style={styles.formStepViewTitleContainer}>
          <Text style={styles.formStepViewTitle}>{this.props.title}</Text>
        </View>
        {/* Form */}
        <View style={styles.formStepViewFormContainer}>
          <FormView
            {...this.props}
            fields={this.state.fields}
            onSubmit={this.props.onTabSubmit}
            onInvalid={this.props.onInvalid} />
        </View>
      </View>
    );
  }
}

export default FormStepView;

const styles = StyleSheet.create({
  formStepViewContainer: {
    flex: 1,
    width: '80%',
    marginLeft: '10%',
  },
  formStepViewTopContainer: {
    alignItems: 'flex-start',
    width: '100%',
  },
  formStepViewTitleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  formStepViewTitle: {
    fontSize: 32,
  },
  formStepViewFormContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  }
});