import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TopLabelText } from './TopLabel.styles';

class TopLabel extends PureComponent {
  render() {
    const { label } = this.props;
    return (
      // eslint-disable-next-line no-return-assign
      <TopLabelText ref={r => this.label = r}>
        {label}
      </TopLabelText>
    );
  }
}

TopLabel.defaultProps = {
  label: '',
};

TopLabel.propTypes = {
  label: PropTypes.string,
};

export default TopLabel;
