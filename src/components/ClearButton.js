import React, { PureComponent } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import noop from '../utils/noop';
import { ClearButtonContainer } from './ClearButton.styles';

class ClearButton extends PureComponent {
  render() {
    const { value, onClear } = this.props;
    return value ? (
      <ClearButtonContainer onPress={onClear}>
        <Text>X</Text>
      </ClearButtonContainer>
    ) : null;
  }
}

ClearButton.defaultProps = {
  value: null,
  onClear: noop,
};

ClearButton.propTypes = {
  value: PropTypes.string,
  onClear: PropTypes.func,
};

export default ClearButton;
