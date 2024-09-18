import { User } from "../models/userSchema.js";

const onlyAdminUploadProudct = async (_id) => {
  try {
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User Not found...!");
    }

    if (user?.role === "ADMIN") {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
};

export default onlyAdminUploadProudct;