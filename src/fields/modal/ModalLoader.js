import React from 'react';
import { ActivityIndicator } from 'react-native';
import { ModalLoaderContainer } from './ModalLoader.styles';

const ModalLoader = () => (
  <ModalLoaderContainer>
    <ActivityIndicator size="large" />
  </ModalLoaderContainer>
);

export default ModalLoader;
