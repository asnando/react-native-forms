import React, { PureComponent } from 'react';
import { Switch as RNSwitch } from 'react-native';
import PropTypes from 'prop-types';
import {
  FormField,
  FormFieldLabel,
} from './FormField.styles';

const initialState = {
  value: false,
};

class Switch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  getValue() {
    const { value } = this.state;
    return value;
  }

  getName() {
    const { name } = this.props;
    return name;
  }

  getDisplayName() {
    const { title } = this.props;
    return title;
  }

  clear() {
    return this.setState({
      value: false,
    });
  }

  handleValueChange(value) {
    return this.setState({ value });
  }

  render() {
    const { value } = this.state;
    const { title, activeColor } = this.props;
    return (
      <FormField>
        {title && (
          <FormFieldLabel>
            {title}
          </FormFieldLabel>
        )}
        <RNSwitch
          value={value}
          trackColor={{ true: activeColor }}
          onValueChange={(...args) => this.handleValueChange(...args)}
        />
      </FormField>
    );
  }
}

Switch.defaultProps = {
  title: null,
  activeColor: null,
};

Switch.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  activeColor: PropTypes.string,
};

export default Switch;
