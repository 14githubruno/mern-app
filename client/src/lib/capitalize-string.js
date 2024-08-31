const capitalize = (string) => {
  let capitalizedString = string
    .split(" ")
    .map((letter) => letter.slice(0, 1).toUpperCase() + letter.slice(1))
    .join(" ");

  return capitalizedString;
};

export { capitalize };
