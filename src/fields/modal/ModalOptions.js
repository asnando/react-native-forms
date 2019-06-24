/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Modal } from 'react-native';
import PropTypes from 'prop-types';
import noop from '../../utils/noop';
import ModalHeader from './ModalHeader';
import ModalContent from './ModalContent';
import ModalLoader from './ModalLoader';

const ModalOptions = (props) => {
  const {
    showModal,
    onShow,
    title,
    hideModal,
    onInputValue,
    showFilterInput,
    options,
    onOptionSelected,
    onNextPage,
    loading,
  } = props;
  return (
    <Modal animationType="slide" visible={showModal} onShow={onShow}>
      <ModalHeader
        title={title}
        hideModal={hideModal}
        onInputValue={onInputValue}
        showFilterInput={showFilterInput} />
      <ModalContent options={options} onOptionSelected={onOptionSelected} onNextPage={onNextPage} />
      { loading && <ModalLoader /> }
    </Modal>
  );
};

ModalOptions.defaultProps = {
  title: '',
  showModal: false,
  loading: true,
  showFilterInput: true,
  options: [],
  hideModal: noop,
  onShow: noop,
  onOptionSelected: noop,
  onNextPage: noop,
  onInputValue: noop,
};

ModalOptions.propTypes = {
  showModal: PropTypes.bool,
  onShow: PropTypes.func,
  title: PropTypes.string,
  hideModal: PropTypes.func,
  onInputValue: PropTypes.func,
  showFilterInput: PropTypes.bool,
  options: PropTypes.array,
  onOptionSelected: PropTypes.func,
  onNextPage: PropTypes.func,
  loading: PropTypes.bool,
};

export default ModalOptions;
