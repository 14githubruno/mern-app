import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  try {
    const hashed = await bcrypt.hash(password, Number(process.env.SALT));
    return hashed;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong. Try again");
  }
};

export { hashPassword };
