import React, { PureComponent, Fragment } from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import {
  ModalSelectList,
} from 'react-native-modal-select-list';
import {
  FormField,
  FormFieldLabel,
} from './FormField.styles';
import {
  OptionInputContainer,
  OptionInputText,
} from './Option.styles';

const initialState = {
  value: null,
};

class Option extends PureComponent {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  saveOptionsListRef(ref) {
    this.optionsList = ref;
  }

  showOptionsList() {
    const { optionsList } = this;
    optionsList.show();
  }

  render() {
    const { value } = this.state;
    const { title, options } = this.props;
    return (
      <Fragment>
        <FormField>
          <FormFieldLabel>
            {title}
          </FormFieldLabel>
          <OptionInputContainer onPress={() => this.showOptionsList()}>
            <OptionInputText>
              {value}
            </OptionInputText>
          </OptionInputContainer>
        </FormField>
        <ModalSelectList
          ref={(...args) => this.saveOptionsListRef(...args)}
          options={options}
        />
      </Fragment>
    );
  }
}

Option.defaultProps = {
  title: null,
  options: [],
};

Option.propTypes = {
  title: PropTypes.string,
  // See "react-native-modal-select-list" options reference.
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  ),
};

export default Option;
