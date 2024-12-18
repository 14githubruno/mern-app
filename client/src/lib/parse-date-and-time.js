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
 * @returns {string} The parsed date and time string in the format: DD Month YYYY (HH.MM).
 */
const parseDateAndTime = (ISOdateAndTime) => {
  const dateAndTime = ISOdateAndTime.split("T");
  const date = dateAndTime[0];
  const time = dateAndTime[1];

  const d = new Date(date);
  const parsedDate = `${d.getDay()} ${months[d.getMonth()]} ${d.getFullYear()}`;

  const [hours, minutes] = time.split(":");
  const parsedTime = `${hours}.${minutes}`;

  const parsedDateAndTime = `${parsedDate} (${parsedTime})`;
  return parsedDateAndTime;
};

export { parseDateAndTime };
