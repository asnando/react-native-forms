import React from 'react';
import PropTypes from 'prop-types';
import {
  ModalHeaderContainer,
  ModalHeaderCloseButton,
  ModalHeaderInput,
  ModalInputClearButton,
  ModalHeaderButtonContainer,
  ModalHeaderInputContainer,
} from './ModalHeader.styles';
import noop from '../../utils/noop';

class ModalHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  onInputValue(value) {
    const { text } = this.state;
    this.setState({ text: value }, () => {
      this.onInputValueChange(value, text);
    });
  }

  onClearValue() {
    this.setState({ text: '' }, () => {
      const { text } = this.state;
      this.onInputValueChange(null, text);
    });
  }

  onInputValueChange(value, prevValue) {
    const { onInputValue } = this.props;
    if (value !== prevValue) {
      if (typeof onInputValue === 'function') {
        onInputValue(value);
      }
    }
  }

  hasValidText() {
    const { text } = this.state;
    return !!text.replace(/\s/g, '');
  }

  render() {
    const { text } = this.state;
    const {
      hideModal,
      showFilterInput,
    } = this.props;
    return (
      <ModalHeaderContainer>
        <ModalHeaderButtonContainer>
          <ModalHeaderCloseButton onPress={hideModal} />
        </ModalHeaderButtonContainer>
        <ModalHeaderInputContainer>
          <ModalHeaderInput
            showFilterInput={showFilterInput}
            value={text}
            onChangeText={(...args) => this.onInputValue(...args)}
          />
        </ModalHeaderInputContainer>
        <ModalHeaderButtonContainer>
          {this.hasValidText() && (<ModalInputClearButton onPress={(...args) => this.onClearValue(...args)} />)}
        </ModalHeaderButtonContainer>
      </ModalHeaderContainer>
    );
  }
}
ModalHeader.defaultProps = {
  showFilterInput: true,
  hideModal: noop,
  onInputValue: noop,
};

ModalHeader.propTypes = {
  hideModal: PropTypes.func,
  showFilterInput: PropTypes.bool,
  onInputValue: PropTypes.func,
};

export default ModalHeader;
