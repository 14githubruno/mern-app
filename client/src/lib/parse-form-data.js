// obj to specify parsing errors (used in FUNC TO PARSE DATA and FUNC TO CHECK PARSING ERRORS)
const error = {
  wrong: {
    type: false,
    msg: "Some data structure is not valid",
  },
  empty: {
    type: "empty",
    msg: "All fields are required",
  },
};

// validate password fn
const validatePassword = (pw) => {
  const whitespace = /\s/;
  const pattern = /^(?=.*?[A-Z])(?=.*?\d)(?=.*?[!#$%&?"]).{10,15}$/;

  let isValid = !whitespace.test(pw) && pattern.test(pw);
  return isValid;
};

// func to parse data
const parseFormData = (data) => {
  let trimmedData = {};
  let finalData = {};

  // check empty fields and, if any, exit
  const values = Object.values(data);
  const empty = values.some((value) => value === "");
  if (empty) {
    finalData = error.empty.type;
    return finalData;
  }

  // trim strings
  for (const key in data) {
    if (typeof data[key] === "string") {
      trimmedData[key] = data[key].trim();
    } else {
      trimmedData[key] = data[key];
    }
  }

  // lower case strings, validate password and return final data
  for (const key in trimmedData) {
    if (typeof trimmedData[key] === "string" && key !== "password") {
      finalData[key] = trimmedData[key].toLowerCase();
    } else if (key === "password" && !validatePassword(trimmedData[key])) {
      finalData = error.wrong.type;
      break;
    } else {
      finalData[key] = trimmedData[key];
    }
  }
  return finalData;
};

// func to check parsing data errors
const checkParsingError = (err) => {
  let msgToToast;

  switch (err) {
    case error.wrong.type:
      msgToToast = error.wrong.msg;
      break;
    case error.empty.type:
      msgToToast = error.empty.msg;
      break;
  }

  return msgToToast;
};

export { parseFormData, checkParsingError };
