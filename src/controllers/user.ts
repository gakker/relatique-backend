import {
  createAdmin,
  findOneUser,
  updateUserById,
} from "../services/userService";
import { NextFunction, Response } from "express";
import { omit } from "lodash";
import { customRequest } from "../types/customDefinition";
import { ApiError } from "../util/ApiError";
import { sendWelcomeEmail } from "../mail/mail";
const omitData = ["password"];
import {
  userExists,
  createUser,
  deleteUserById,
} from "../services/userService";
import User from "../models/User";
export const updateUser = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.user;

    let body = req.body;
    body = omit(body, omitData);

    const user = await findOneUser({ id: userId });

    if (!user) {
      throw new ApiError(400, "User not found");
    }

    const updated = await updateUserById(body, parseInt(userId, 10));

    return res.status(200).json({
      updated: updated[0],
      msg: updated[0] ? "Data updated successfully" : "failed to update",
      error: false,
    });
  } catch (err) {
    next(err);
  }
};

export const getUserData = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({
      data: req.user,
      error: false,
    });
  } catch (err) {
    next(err);
  }
};

export const inviteAdmin = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email } = req.body;
    const user = await userExists({ email });
    if (user) {
      throw new ApiError(400, "Email already used");
    }
    const newUser = await createAdmin({ name, email, role: "ADMIN" });
    sendWelcomeEmail(newUser.email, newUser.name);
    return res.status(200).json({
      data: omit(newUser.toJSON(), omitData),
      error: false,
      msg: "Admin invited successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: userId } = req.user;
    const user = await findOneUser({ id: userId });
    if (!user) {
      throw new ApiError(400, "User not found");
    }
    const deleted: any = await deleteUserById(parseInt(userId, 10));
    return res.status(200).json({
      deleted: deleted[0],
      msg: deleted[0] ? "failed to delete" : "User deleted successfully",
      error: false,
    });
  } catch (err) {
    next(err);
  }
};
