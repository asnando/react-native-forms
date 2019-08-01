import {
  emailValidator,
} from '../index';

const resolveValidatorFromList = (name) => {
  switch (name) {
    case 'email':
      return emailValidator;
    default:
      return null;
  }
};

export default resolveValidatorFromList;
