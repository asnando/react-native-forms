const isEmptyString = str => (typeof str === 'string' && /^\s{0,}$/.test(str));

export default isEmptyString;
