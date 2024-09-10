const throwError = (res, status = 500, errorMsg) => {
  res.status(status);
  throw new Error(errorMsg);
};

export { throwError };
