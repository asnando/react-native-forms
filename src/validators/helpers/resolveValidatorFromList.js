import {
  phoneValidator,
  CPFValidator,
  CNPJValidator,
  emailValidator,
  brazilianPhoneValidator,
} from '../index';

const resolveValidatorFromList = (name) => {
  switch (name) {
    case 'br-cellphone':
      return brazilianPhoneValidator;
    case 'phone':
      return phoneValidator;
    case 'cpf':
      return CPFValidator;
    case 'cnpj':
      return CNPJValidator;
    case 'email':
      return emailValidator;
    default:
      return null;
  }
};

export default resolveValidatorFromList;
