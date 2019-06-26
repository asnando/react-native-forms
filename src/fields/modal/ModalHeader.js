import React from 'react';
import PropTypes from 'prop-types';
import {
  ModalHeaderContainer,
  ModalHeaderCloseButton,
  ModalHeaderInput,
  ModalInputClearButton,
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
        <ModalHeaderCloseButton onPress={hideModal} />
        <ModalHeaderInput
          showFilterInput={showFilterInput}
          value={text}
          onChangeText={this.onInputValue.bind(this)}
        />
        {
          this.hasValidText() && (<ModalInputClearButton onPress={this.onClearValue.bind(this)} />)
        }
      </ModalHeaderContainer>
    );
  }
}
ModalHeader.defaultProps = {
  showFilterInput: true,
  hideModal: noop,
  onClearValue: noop,
  onInputValue: noop,
};

ModalHeader.propTypes = {
  hideModal: PropTypes.func,
  showFilterInput: PropTypes.bool,
  onClearValue: PropTypes.func,
  onInputValue: PropTypes.func,
};

export default ModalHeader;
