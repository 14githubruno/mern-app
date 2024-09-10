const throwError = (res, status, errorMsg) => {
  res.status(status);
  throw new Error(errorMsg);
};

export { throwError };
