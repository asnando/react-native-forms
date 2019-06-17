/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import {
  ModalContentOption,
  ModalContentOptionLabel,
} from './ModalContent.styles';
import noop from '../../utils/noop';

const ModalContent = (props) => {
  const { options, onNextPage } = props;

  const renderItem = ({ item }) => {
    const { label, value } = item;
    let { onOptionSelected } = props;
    onOptionSelected = onOptionSelected.bind(onOptionSelected, value);
    return (
      <ModalContentOption onPress={onOptionSelected}>
        <ModalContentOptionLabel>
          {label}
        </ModalContentOptionLabel>
      </ModalContentOption>
    );
  };

  return (
    <FlatList
      data={options}
      renderItem={renderItem}
      onEndReached={onNextPage}
      keyExtractor={(item, index) => index.toString()} />
  );
};

ModalContent.defaultProps = {
  options: [],
  onNextPage: noop,
  onOptionSelected: noop,
};

ModalContent.propTypes = {
  options: PropTypes.array,
  onOptionSelected: PropTypes.func,
  onNextPage: PropTypes.func,
};

export default ModalContent;
