import bcrypt, { genSalt } from "bcrypt" ;

import User from "../schema/userSchema.js";
import generateToken from "../config/generateToken.js";

// register user in db (sign-up)
export const registerUser = async (req, res) => {
  try {

    const {name ,email ,password ,picture} = req.body ;
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400);
      throw new Error("User already exists!");
    }

    // const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password ,10) ; // 2nd arg is by-default is salt
    const user = { name: name ,email: email ,password: hashedPassword, picture:picture }

    const newUser = new User(user); //varifying schema of user
    if (newUser) {
      await newUser.save();
      return res
        .status(200)
        .json({ newUser, token: generateToken(newUser._id) });
    } else {
      throw new Error("User schema diden't match");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// auth user (login)

export const authUser = async (req, res) => {
  try {
    const { email ,password } = req.body ;
    const user = await User.findOne({email}) ;

    if(user && (await user.matchPassword(password)) ){
      res.status(200).json({user,token: generateToken(user._id) }) ;
    }else{
      res.status(400) ;
      throw new Error("Invalid Email or Password") ;
    }

  } catch (error) {
    res.status(400).json({message : error.message}) ;
  }
};
