import React from 'react';
import { Modal } from 'react-native';
import ModalHeader from './ModalHeader';
import ModalContent from './ModalContent';
import ModalLoader from './ModalLoader';

const ModalOptions = (props) => {
  return (
    <Modal
      animationType="slide"
      visible={props.showModal}
      onShow={props.onShow}>
      <ModalHeader
        title={props.title}
        hideModal={props.hideModal}
        onInputValue={props.onInputValue}
        showFilterInput={props.showFilterInput} />
      <ModalContent
        options={props.options}
        onOptionSelected={props.onOptionSelected}
        onNextPage={props.onNextPage} />
      { props.loading ? <ModalLoader /> : null}
    </Modal>
  );
}

export default ModalOptions;