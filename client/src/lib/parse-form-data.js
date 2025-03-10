/**
 * @constant
 * Error object containing predefined error messages.
 *
 * @type {{ wrong: { type: string; msg: string; }, empty: { type: string; msg: string; } }}
 */
const error = {
  wrong: {
    type: "wrong",
    msg: "Some data structure is not valid",
  },
  empty: {
    type: "empty",
    msg: "All fields are required",
  },
};

/**
 * @function
 * Validate password against pattern.
 *
 * @param {string} pw - The password to validate.
 *
 * @returns {boolean} - True if password is valid, false otherwise.
 */
const validatePassword = (pw) => {
  const whitespace = /\s/;
  const pattern = /^(?=.*?[A-Z])(?=.*?\d)(?=.*?[!#$%&?"]).{8,20}$/;

  let isValid = !whitespace.test(pw) && pattern.test(pw);
  return isValid;
};

/**
 * @function
 * Parse form data on the client.
 *
 * (Uses the custom error object of this file.
 * If parsing is successful, it returns the data, otherwise the error type)
 *
 * @param {Object} data - The form data to parse.
 *
 * @returns {Object|string} Parsed data or, if parsing fails, the error type.
 */
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

/**
 * @function
 * Check which error message to display, if any error.
 *
 * (Uses the custom error object of this file.
 * If any error type is found, it returns the relative error message)
 *
 * (The argument to pass to this function comes, eventually,
 * from the parseFormData result)
 *
 * @param {string|undefined} err - The error type string.
 *
 * @returns {string|undefined} The error message if found, undefined otherwise.
 */
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
