import React, { PureComponent } from 'react';
import { Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import {
  StepIndicatorContainer,
  StepIndicatorCircle,
} from './StepIndicator.styles';

const initialState = {
  visible: true,
};

class StepIndicator extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentWillMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide.bind(this));
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  handleKeyboardDidShow() {
    return this.setState({ visible: false });
  }

  handleKeyboardDidHide() {
    return this.setState({ visible: true });
  }

  render() {
    const { visible } = this.state;
    const {
      steps,
      currentIndex,
      stepIndicatorColor,
    } = this.props;
    return visible && (
      <StepIndicatorContainer>
        {
          steps.map((step, stepIndex) => {
            const active = currentIndex === stepIndex;
            // eslint-disable-next-line react/no-array-index-key
            return (<StepIndicatorCircle key={stepIndex} active={active} stepIndicatorColor={stepIndicatorColor} />);
          })
        }
      </StepIndicatorContainer>
    );
  }
}

StepIndicator.defaultProps = {
  steps: [],
  currentIndex: 0,
  stepIndicatorColor: null,
};

StepIndicator.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  steps: PropTypes.array,
  currentIndex: PropTypes.number,
  stepIndicatorColor: PropTypes.string,
};

export default StepIndicator;
