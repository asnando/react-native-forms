/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

const STEP_INDICATOR_CIRCLE_INACTIVE_COLOR = '#bbb';
const STEP_INDICATOR_CIRCLE_ACTIVE_COLOR = '#3d99fc';

export const StepIndicatorContainer = styled.View`
  flex-direction: row;
  height: 64;
  align-items: center;
  justify-content: center;
  background-color: transparent;
`;

export const StepIndicatorCircle = styled.View`
  width: 8;
  height: 8;
  border-radius: 4;
  margin-left: 4;
  margin-right: 4;
  background-color: ${props => (
    props.active
      ? props.stepIndicatorColor || STEP_INDICATOR_CIRCLE_ACTIVE_COLOR
      : STEP_INDICATOR_CIRCLE_INACTIVE_COLOR
  )};
`;
