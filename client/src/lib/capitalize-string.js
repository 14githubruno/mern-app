/**
 * Function to capitalize the first letter of each word of a given string.
 *
 * (This function is only used in the custom hook useHeadTags)
 *
 * @param {string} string - The string to capitalize.
 *
 * @returns {string} The capitalized string.
 */
const capitalize = (string) => {
  let capitalizedString = string
    .split(" ")
    .map((letter) => letter.slice(0, 1).toUpperCase() + letter.slice(1))
    .join(" ");

  return capitalizedString;
};

export { capitalize };
