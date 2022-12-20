import User from "../schema/userSchema.js";
import generateToken from "../config/generateToken.js";

export const registerUser = async (req, res) => {
  try {
    let email = req.body.email;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const newUser = new User(req.body); //varifying schema of user
    if(newUser){
      await newUser.save();
      return res.status(200).json({newUser ,token:generateToken(newUser._id) });
    } 

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
