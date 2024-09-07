import asyncHandler from "express-async-handler";
import User from "../models/user-model.js";

const deleteUnveriedUsers = asyncHandler(async (req, res, next) => {
  const expiredUsers = await User.find({
    verified: false,
  });

  let names = [];
  if (expiredUsers.length > 0) {
    expiredUsers.map((user) => names.push(user.name));
    console.log(expiredUsers.length);
    console.log(names);
    next();
  } else {
    console.log("All users are verified");
  }
});

export { deleteUnveriedUsers };
