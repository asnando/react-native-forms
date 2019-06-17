/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const ClearButtonContainer = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  display: ${props => (props.value ? 'flex' : 'none')};
`;
