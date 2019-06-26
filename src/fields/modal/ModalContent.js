/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import ModalLoader from './ModalLoader';
import {
  ModalContentOption,
  ModalContentOptionLabel,
} from './ModalContent.styles';
import noop from '../../utils/noop';

class ModalContent extends PureComponent {
  renderListItem({ item }) {
    const { label, value } = item;
    let { onOptionSelected } = this.props;
    onOptionSelected = onOptionSelected.bind(onOptionSelected, value);
    return (
      <ModalContentOption onPress={onOptionSelected}>
        <ModalContentOptionLabel>
          {label}
        </ModalContentOptionLabel>
      </ModalContentOption>
    );
  }

  renderActivityIndicator() {
    const { loading } = this.props;
    return loading && <ModalLoader />;
  }

  render() {
    const { options, onNextPage } = this.props;
    return (
      <FlatList
        data={options}
        renderItem={this.renderListItem.bind(this)}
        onEndReached={onNextPage}
        ListFooterComponent={this.renderActivityIndicator.bind(this)}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

ModalContent.defaultProps = {
  options: [],
  onNextPage: noop,
  onOptionSelected: noop,
};

ModalContent.propTypes = {
  options: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  onOptionSelected: PropTypes.func,
  onNextPage: PropTypes.func,
};

export default ModalContent;
