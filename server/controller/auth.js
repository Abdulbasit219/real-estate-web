import { comparePassword, hashpassword } from "../helper/bcr_helper.js";
import userModels from "../models/userModels.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // validation
    if (!name) {
      return res.send({
        message: "Name is required",
      });
    } else if (!email) {
      return res.send({
        message: "Email is required",
      });
    } else if (!password) {
      return res.send({
        message: "Password is required",
      });
    }

    // check pass length
    if (password.length < 8) {
      return res.status(400).send({
        success: false,
        message: "Password must be at least 8 characters long",
      });
    }

    //existing users
    const existingUsers = await userModels.findOne({ email });
    if (existingUsers) {
      return res.status(200).send({
        success: false,
        message: "Users already exist",
      });
    }

    //hashpassword
    const hashedpassword = await hashpassword(password);

    const user = await new userModels({
      name,
      email,
      password: hashedpassword,
    }).save();
    res.status(200).send({
      success: true,
      message: "User Register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // check user with email
    const user = await userModels.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User Not Found",
      });
    }

    // compare passwords
    const matchPassword = await comparePassword(password, user.password);
    if (!matchPassword) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // jwt token
    const jwtToken = await JWT.sign({ _id: user._id }, process.env.SECRET_KEY);

    //send user without password
    const { password: _, ...rest } = user._doc;


    // cookie
    res.cookie("access_token", jwtToken, { httpOnly: true }).status(200).json({
      success: true,
      message: "login successful",
      user: rest,
      token: jwtToken
    });

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

export const googleController = async (req, res) => {
  try {
    const user = await userModels.findOne({ email: req.body.email });
    if (user) {
      // jwt token
      const jwtToken = await JWT.sign(
        { _id: user._id },
        process.env.SECRET_KEY
      );

      //send user without password
      const { password: _, ...rest } = user._doc;

      // cookie
      res
        .cookie("access_token", jwtToken, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      //hashpassword
      const hashedpassword = await hashpassword(generatePassword);

      const newUser = new userModels({
        name: req.body.name.split(" ").join("").toLowerCase(),
        email: req.body.email,
        password: hashedpassword,
        avatar: req.body.photo,
      });

      await newUser.save();
      const jwtToken = await JWT.sign({ id: user._id }, process.env.SECRET_KEY);

      //send user without password
      const { password: _, ...rest } = user._doc;

      // cookie
      res
        .cookie("access_token", jwtToken, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    console.log(error);
  }
};
