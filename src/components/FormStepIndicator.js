import React, { PureComponent } from 'react';
import { Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import {
  FormStepIndicatorContainer,
  StepIndicator,
} from './FormStepIndicator.styles';

// const initialState = {
//   visible: true,
// };

class FormStepIndicator extends PureComponent {
  // constructor(props) {
  //   super(props);
  //   this.state = initialState;
  // }

  // componentDidMount() {
  //   this.keyboardWillShowListener = Keyboard.addListener(
  //     'keyboardWillShow',
  //     this.handleKeyboardShow.bind(this),
  //   );
  //   this.keyboardDidHideListener = Keyboard.addListener(
  //     'keyboardDidHide',
  //     this.handleKeyboardHide.bind(this),
  //   );
  // }

  // componentWillUnmount() {
  //   this.keyboardWillShowListener.remove();
  //   this.keyboardDidHideListener.remove();
  // }

  // handleKeyboardShow() {
  //   return this.setState({ visible: false });
  // }

  // handleKeyboardHide() {
  //   return this.setState({ visible: true });
  // }

  renderStepsIndicators() {
    const { stepsSize, activeIndex, indicatorColor } = this.props;
    const indicators = [];
    for (let i = 0; i < stepsSize; i += 1) {
      indicators.push(
        <StepIndicator
          active={i === activeIndex}
          key={i}
          indicatorColor={indicatorColor}
        />,
      );
    }
    return indicators;
  }

  render() {
    // const { visible } = this.state;
    return (
      <FormStepIndicatorContainer>
        {this.renderStepsIndicators()}
      </FormStepIndicatorContainer>
    );
  }
}

FormStepIndicator.defaultProps = {
  activeIndex: 0,
  indicatorColor: null,
};

FormStepIndicator.propTypes = {
  activeIndex: PropTypes.number,
  stepsSize: PropTypes.number.isRequired,
  indicatorColor: PropTypes.string,
};

export default FormStepIndicator;
