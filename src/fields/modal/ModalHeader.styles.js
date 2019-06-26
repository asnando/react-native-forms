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
  width: 32;
  height: 32;
  border-radius: 4;
  background-color: #ccc;
`;

export const ModalHeaderInput = styled.TextInput`
  display: ${props => (!props.showFilterInput ? 'none' : 'flex')};
  height: 32;
  border-width: 1;
  border-radius: 4;
  border-color: #aaa;
  background-color: #fff;
`;

export const ModalInputClearButton = styled.TouchableOpacity`
  width: 100%;
  border-radius: 4;
  width: 32;
  height: 32;
  background-color: #ccc;
`;

export const ModalHeaderButtonContainer = styled.View`
  flex: 2;
  align-items: center;
`;

export const ModalHeaderInputContainer = styled.View`
  flex: 8;
`;
