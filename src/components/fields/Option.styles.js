import styled from 'styled-components';

const OPTION_INPUT_CONTAINER_HEIGHT = 42;
const OPTION_INPUT_ARROW_RIGHT_SIZE = 24;
const OPTION_INPUT_CLEAR_BUTTON_SIZE = 18;

export const OptionInputArrowRight = styled.Text`
  font-weight: bold;
  position: absolute;
  right: 16;
  top: ${(OPTION_INPUT_CONTAINER_HEIGHT - OPTION_INPUT_ARROW_RIGHT_SIZE) / 2};
  color: #ccc;
  font-size: 18;
`;

export const OptionInputContainer = styled.TouchableOpacity`
  height: ${OPTION_INPUT_CONTAINER_HEIGHT};
  border-radius: 4;
  width: 100%;
`;

export const OptionInputText = styled.Text`
  flex: 1;
  padding-left: 8;
  line-height: ${OPTION_INPUT_CONTAINER_HEIGHT};
`;

export const OptionInputClearButton = styled.TouchableOpacity`
  background-color: #eee;
  width: ${OPTION_INPUT_CLEAR_BUTTON_SIZE};
  height: ${OPTION_INPUT_CLEAR_BUTTON_SIZE};
  border-radius: ${OPTION_INPUT_CLEAR_BUTTON_SIZE / 2};
  position: absolute;
  right: 8;
  top: ${(OPTION_INPUT_CONTAINER_HEIGHT - OPTION_INPUT_CLEAR_BUTTON_SIZE) / 2};
  align-items: center;
  justify-content: center;
`;

export const OptionInputClearButtonText = styled.Text`
  font-size: 12;
  color: #aaa;
`;
