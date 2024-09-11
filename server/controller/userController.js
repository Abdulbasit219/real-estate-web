import { hashpassword } from "../helper/bcr_helper.js";
import { errorHandler } from "../utils/ErrorHandler.js";
import userModel from "../models/userModels.js";
import JWT from "jsonwebtoken";

export const updateUserController = async (req, res, next) => {
  if (req.user._id !== req.params.id) {
    return next(errorHandler(401, "Update your own account"));
  }

  try {
    if (req.body.password) {
      req.body.password = await hashpassword(req.body.password);
    }
    const updateUser = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    // create new jwt token
    const jwtToken = await JWT.sign({ _id: updateUser._id }, process.env.SECRET_KEY);

    const { password, ...rest } = updateUser._doc;

    return res.status(200).send({
      success: true,
      message: "user successfully updated",
      user: rest,
      token: jwtToken
    });
  } catch (error) {
    next(error);
  }
};

// const { id } = req.params;
// const { name, email, password, avatar } = req.body;

// const updateData = {};
// if (name) {
//   updateData.name = name;
// } else if (email) {
//   updateData.email = email;
// } else if (password) {
//   updateData.password = password;
// }else if(avatar){
//   updateData.avatar = avatar;
// }

// const updateUser = await userModel.findByIdAndUpdate(id, updateData, {
//   new: true,
// });

// if(!updateUser) {
//   return res.status(404).send({
//     success: false,
//     message: 'User not found'
//   })
// }

// const { password, ...rest } = updateUser._doc;

// res.status(200).send({
//   success: true,
//   message: 'User successfully updated',
//   user: updateUser
// })
