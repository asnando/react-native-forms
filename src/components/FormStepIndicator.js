import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  FormStepIndicatorContainer,
  StepIndicator,
} from './FormStepIndicator.styles';

class FormStepIndicator extends PureComponent {
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
