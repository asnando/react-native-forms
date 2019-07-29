import styled from 'styled-components';

const FORM_STEP_INDICATOR_CONTAINER_HEIGHT = 32;
const FORM_STEP_INDICATOR_INACTIVE_COLOR = '#ccc';
const FORM_STEP_INDICATOR_ACTIVE_COLOR = 'rgb(32,150,243)';
const FORM_STEP_INDICATOR_SIZE = 8;

export const FormStepIndicatorContainer = styled.SafeAreaView`
  width: 100%;
  height: ${FORM_STEP_INDICATOR_CONTAINER_HEIGHT};
  flex-direction: row;
  justify-content: center;
`;

export const StepIndicator = styled.View`
  width: ${FORM_STEP_INDICATOR_SIZE};
  height: ${FORM_STEP_INDICATOR_SIZE};
  border-radius: ${FORM_STEP_INDICATOR_SIZE / 2};
  margin-left: 4;
  margin-right: 4;
  background-color: ${props => (
    props.active
      ? (props.indicatorColor || FORM_STEP_INDICATOR_ACTIVE_COLOR)
      : FORM_STEP_INDICATOR_INACTIVE_COLOR
  )};
`;
