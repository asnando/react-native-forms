/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const ClearButtonContainer = styled.TouchableOpacity`
  position: absolute;
  right: -20;
  padding-top: 4;
  display: ${props => (props.value ? 'flex' : 'none')};
`;
