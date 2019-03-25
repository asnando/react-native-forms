import React from 'react';
import { Modal } from 'react-native';
import ModalHeader from './ModalHeader';
import ModalContent from './ModalContent';
import ModalLoader from './ModalLoader';

const ModalOptions = (props) => {
  return (
    <Modal animationType="slide" visible={props.showModal} onShow={props.onShow}>
      <ModalHeader title={props.title} hideModal={props.hideModal} />
      {
        props.loadingOptions
        ? <ModalLoader  />
        : <ModalContent options={props.options} onOptionSelected={props.onOptionSelected} />
      }
    </Modal>
  );
}

export default ModalOptions;