/* 
*****************************************************
FUNC TO VALIDATE PASSWORD
*****************************************************
*/
const validatePassword = (pw) => {
  const whitespace = /\s/;
  const pattern = /^(?=.*?[A-Z])(?=.*?\d)(?=.*?[!#$%&?"]).{10,15}$/;

  let isValid = !whitespace.test(pw) || pattern.test(pw);
  return isValid;
};
/*
 *****************************************************
 */

/* 
*****************************************************
FUNC TO PARSE DATA (THE ONE TO EXPORT)
*****************************************************
*/
const parseFormData = (data) => {
  let trimmedData = {};
  let finalData = {};

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
      finalData = false;
      break;
    }
    finalData[key] = trimmedData[key];
  }
  return finalData;
};
/*
 *****************************************************
 */

export { parseFormData };
