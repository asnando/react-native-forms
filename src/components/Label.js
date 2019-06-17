/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import {
  LabelContainer,
  LabelText,
} from './Label.styles';

const SimpleLabel = (props) => {
  const { label, children } = props;
  return (
    <LabelContainer>
      <LabelText>
        {label}
      </LabelText>
      {children}
    </LabelContainer>
  );
};

SimpleLabel.defaultProps = {
  label: '',
};

SimpleLabel.propTypes = {
  label: PropTypes.string,
  children: PropTypes.array.isRequired,
};

export default SimpleLabel;
