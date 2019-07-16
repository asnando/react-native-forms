import styled from 'styled-components';

const MODAL_HEADER_HEIGHT = 100;
const MODAL_HEADER_BUTTON_SIZE = 32;
const MODAL_HEADER_BUTTON_TEXT_COLOR = '#606060';
const MODAL_HEADER_BUTTON_TEXT_FONT_SIZE = 24;

export const ModalHeaderContainer = styled.SafeAreaView`
  height: ${MODAL_HEADER_HEIGHT};
  background-color: #eee;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1;
  border-color: #d5d5d5;
`;

export const ModalHeaderCloseButton = styled.TouchableOpacity`
  width: ${MODAL_HEADER_BUTTON_SIZE};
  height: ${MODAL_HEADER_BUTTON_SIZE};
  border-radius: 4;
  align-items: center;
  justify-content: center;
`;

export const ModalHeaderCloseButtonText = styled.Text`
  font-size: ${MODAL_HEADER_BUTTON_TEXT_FONT_SIZE};
  font-weight: bold;
  color: ${MODAL_HEADER_BUTTON_TEXT_COLOR};
`;

export const ModalHeaderInput = styled.TextInput`
  display: ${props => (!props.showFilterInput ? 'none' : 'flex')};
  font-size: 18;
  line-height: 18;
  border-width: 1;
  border-radius: 4;
  border-color: #aaa;
  background-color: #fff;
  padding-left: 8;
`;

export const ModalInputClearButton = styled.TouchableOpacity`
  width: 100%;
  border-radius: 4;
  width: ${MODAL_HEADER_BUTTON_SIZE};
  height: ${MODAL_HEADER_BUTTON_SIZE};
  align-items: center;
  justify-content: center;
`;

export const ModalInputClearButtonText = styled.Text`
  font-size: ${MODAL_HEADER_BUTTON_TEXT_FONT_SIZE};
  font-weight: bold;
  color: ${MODAL_HEADER_BUTTON_TEXT_COLOR};
`;

export const ModalHeaderButtonContainer = styled.View`
  flex: 2;
  align-items: center;
`;

export const ModalHeaderInputContainer = styled.View`
  flex: 8;
  height: 40;
`;
