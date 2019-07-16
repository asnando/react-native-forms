/* eslint-disable import/prefer-default-export */
import React from 'react';
import { ModalIconArrowRight } from './ModalOptionsIcons.styles';

export const IconArrowRight = (props) => {
  const { value } = props;
  return !value ? (
    <ModalIconArrowRight>
      >
    </ModalIconArrowRight>
  ) : null;
};
