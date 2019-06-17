import React from 'react';
import PropTypes from 'prop-types';
import {
  StepIndicatorContainer,
  StepIndicatorCircle,
} from './StepIndicator.styles';

const StepIndicator = (props) => {
  const { steps, currentIndex } = props;
  return (
    <StepIndicatorContainer>
      {
        steps.map((step, stepIndex) => {
          const active = currentIndex === stepIndex;
          // eslint-disable-next-line react/no-array-index-key
          return (<StepIndicatorCircle key={stepIndex} active={active} />);
        })
      }
    </StepIndicatorContainer>
  );
};

StepIndicator.defaultProps = {
  steps: [],
  currentIndex: 0,
};

StepIndicator.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  steps: PropTypes.array,
  currentIndex: PropTypes.number,
};

export default StepIndicator;
