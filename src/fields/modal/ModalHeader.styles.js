import styled from 'styled-components';

const MODAL_HEADER_HEIGHT = 100;

export const ModalHeaderContainer = styled.SafeAreaView`
  height: ${MODAL_HEADER_HEIGHT};
  background-color: #eee;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1;
  border-color: #d5d5d5;
`;

export const ModalHeaderCloseButton = styled.TouchableOpacity`
  margin-left: 16;
  width: 32;
  height: 32;
  border-radius: 4;
  background-color: #ccc;
`;

export const ModalHeaderInput = styled.TextInput`
  display: ${props => (!props.showFilterInput ? 'none' : 'flex')}
`;

export const ModalInputClearButton = styled.TouchableOpacity`
  margin-right: 16;
  width: 32;
  height: 32;
  background-color: #ccc;
`;
