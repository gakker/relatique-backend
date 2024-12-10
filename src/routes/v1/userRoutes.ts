import { Router } from "express";
import { isAdmin, requireUser, validateRequest } from "../../middleware";
import {
  getUserData,
  inviteAdmin,
  updateUser,
  deleteUser,
} from "../../controllers/user";
import { updateSchema } from "../../validation/user";

const userRouter = Router();

userRouter.patch("/", requireUser, validateRequest(updateSchema), updateUser);
userRouter.get("/", requireUser, getUserData);
userRouter.post("/invite", requireUser, isAdmin, inviteAdmin);
//delete user by id
userRouter.delete("/", requireUser, deleteUser);

export default userRouter;
