const passwordIsValid = (password) => {
  const pattern = /^(?=.*?[A-Z])(?=.*?\d)(?=.*?[!#$%&?"]).{10,15}$/;
  const isValid = password.match(pattern);

  return isValid;
};

export { passwordIsValid };
