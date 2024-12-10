import { Router } from "express";

import { registerDoctor } from "../../controllers/doctors";

import { registerSchema } from "/../validation/doctor";
import { requireUser, validateRequest } from "/../middleware";

const doctorRouter = Router();

doctorRouter.post(
  "/",
  requireUser,
  validateRequest(registerSchema),
  registerDoctor
);


