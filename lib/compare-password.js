import bcrypt from "bcrypt";

const comparePassword = async (reqBodyPassword, DBPassword) => {
  try {
    const match = await bcrypt.compare(reqBodyPassword, DBPassword);
    return match;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong. Try again");
  }
};

export { comparePassword };
