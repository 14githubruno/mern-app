const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * @function
 * Parse date
 *
 * @param {string} ISOdateAndTime - The date and time string in ISO format.
 *
 * @returns {string} The parsed date string in the format: DD Mon YYYY [i.e. 1 Jan 2000]
 */
const parseDateAndTime = (ISOdateAndTime) => {
  const dateAndTime = ISOdateAndTime.split("T");
  const date = dateAndTime[0];

  const d = new Date(date);
  const parsedDate = `${d.getDate()} ${months[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
  return parsedDate;
};

export { parseDateAndTime };
