/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const FormContainer = styled.SafeAreaView`
  height: ${props => props.fullHeight ? '100%' : 'auto'};
  width: 100%;
  flex-direction: row;
`;

export const formScrollViewStyle = {
  flex: 1,
  justifyContent: 'center',
};
