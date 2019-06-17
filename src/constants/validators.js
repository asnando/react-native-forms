// EMAIL
const email = (value) => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
};

// PHONE
const phone = (value) => {
  return /^\d{2}\d{8,}$/.test(value);
};

// CNPJ
const cnpj = (value) => {
  return /[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/.test(value);
};

// CPF
const cpf = (value) => {
  // return /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/.test(value);
  var Soma, Resto;
  Soma = 0;
  if (value == "00000000000") return false;
    
  for (i=1; i<=9; i++) Soma = Soma + parseInt(value.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;
  
  if ((Resto == 10) || (Resto == 11))  Resto = 0;
  if (Resto != parseInt(value.substring(9, 10)) ) return false;
  
  Soma = 0;
  for (i = 1; i <= 10; i++) Soma = Soma + parseInt(value.substring(i-1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11))  Resto = 0;
  if (Resto != parseInt(value.substring(10, 11) ) ) return false;
  return true;
};

export default {
  email,
  phone,
  cpf,
  cnpj
}