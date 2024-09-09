const generateSecret = () => {
  const secret = [];

  for (let i = 0; i < 6; i++) {
    secret.push(Math.floor(Math.random() * 10));
  }

  return secret.join("");
};

export { generateSecret };
