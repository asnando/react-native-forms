const phoneValidator = value => /^\d{2}\d{8,}$/.test(value);

export default phoneValidator;
