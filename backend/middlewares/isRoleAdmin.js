import { User } from "../models/userSchema.js";

const onlyAdminUploadProudct = async (_id) => {
  const user = await User.findById(_id);

  if (user.role === "ADMIN") {
    return true;
  }
  return false;
};

export default onlyAdminUploadProudct;
