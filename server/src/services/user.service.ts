import User, { IUser } from "../models/user.model"

export const createUser = async (user: IUser): Promise<any | null> => {
  try {
    const newUser = new User({
      ...user
    })
    await newUser.save();
    return newUser;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export const getUserByUserName = async (username: string) => {
  try {
    const user = await User.findOne({ username });
    if (user) {
      return user;
    }
    return null;
  } catch (error) {
    console.error('Error Getting User by User Name:', error);
    throw error;
  }
}

export const getUserById = async (userId: string) => {
  try {
    const user = await User.findById(userId).select("-password");
    if (user) {
      return user;
    }
    return null;
  } catch (error) {
    console.error('Error Getting User by Id:', error);
    throw error;
  }
}

export const getAllUsersForUserId = async (userId: string) => {
  try {
    const user = await User.find({ _id: { $ne: userId } }).select("-password");
    if (user) {
      return user;
    }
    return null;
  } catch (error) {
    console.error('Error Getting User by Id:', error);
    throw error;
  }
}


