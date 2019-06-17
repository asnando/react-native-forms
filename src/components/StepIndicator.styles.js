/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const StepIndicatorContainer = styled.View`
  flex-direction: row;
  height: 128;
  padding-bottom: 16;
  align-items: center;
  justify-content: center;  
`;

export const StepIndicatorCircle = styled.View`
  width: 8;
  height: 8;
  border-radius: 4;
  margin-left: 4;
  margin-right: 4;
  background-color: ${props => (props.active ? '#3d99fc' : '#bbb')}
`;
