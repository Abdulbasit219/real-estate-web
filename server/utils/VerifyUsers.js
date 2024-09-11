import { errorHandler } from "./ErrorHandler.js";
import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return next(errorHandler(401, "Unauthorized"));
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return next(errorHandler(403, `${err} forbidden`));
    req.user = user;
    next();
  });
};
