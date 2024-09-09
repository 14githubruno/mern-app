const isEmpty = (reqBody) => {
  return Object.values(reqBody).some((value) => value === "");
};

export { isEmpty };
