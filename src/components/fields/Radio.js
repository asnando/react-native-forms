import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import RadioGroup from 'react-native-radio-buttons-group';
import {
  FormField,
  FormFieldLabel,
} from './FormField.styles';

const initialState = {
  options: [],
};

const mapOptionsToState = options => options.map((option, index) => ({
  ...option,
  selected: !index,
}));

class Radio extends PureComponent {
  constructor(props) {
    const { options: propOptions } = props;
    super(props);
    this.state = {
      ...initialState,
      options: mapOptionsToState(propOptions),
    };
  }

  componentDidMount() {
    const { saveFormFieldRef } = this.props;
    if (typeof saveFormFieldRef === 'function') {
      saveFormFieldRef(this);
    }
  }

  getName() {
    const { name } = this.props;
    return name;
  }

  getValue() {
    const { options } = this.state;
    const selected = options.find(option => option.selected);
    const { value: selectedOptionValue } = selected;
    return selectedOptionValue;
  }

  // clear() {}

  handleOnPress(options) {
    return this.setState({ options });
  }

  render() {
    const { title } = this.props;
    const { options } = this.state;
    return (
      <FormField>
        {title && (
          <FormFieldLabel>
            {title}
          </FormFieldLabel>
        )}
        <RadioGroup
          radioButtons={options}
          flexDirection="row"
          onPress={(...args) => this.handleOnPress(...args)}
        />
      </FormField>
    );
  }
}

Radio.defaultProps = {
  title: null,
  options: [],
  saveFormFieldRef: null,
};

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.any,
    }),
  ),
  saveFormFieldRef: PropTypes.func,
};

export default Radio;
