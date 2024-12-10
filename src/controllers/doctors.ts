import { createDoctor } from "../services/doctorService";

import { NextFunction, Request, Response } from "express";
import { omit } from "lodash";

import { ApiError } from "../util/ApiError";
import { userExists } from "../services/userService";

export const registerDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const doctor = req.body;
    const user = req.body.user_id;
    const userExist = await userExists(user);
    if (!userExist) {
      throw new ApiError(
        400,
        "User doesnt exist please register yourself first before creating doctor profile."
      );
    }
    const newDoctor = await createDoctor(doctor);

    return res.status(200).json({
      data: newDoctor,
      error: false,
      msg: "Doctor registered successfully",
    });
  } catch (err) {
    next(err);
  }
};


