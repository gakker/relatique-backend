import Joi from "joi";
import { spec } from "node:test/reporters";

export const registerSchema = Joi.object({
  userid: Joi.number().required(),
  specialization: Joi.string().required(),
  experience_yrs: Joi.number().required(),
  qualification: Joi.string().required(),
  status: Joi.boolean(),
  clinic_address: Joi.string(),
  gender: Joi.string().required(),
});

export const updateSchema = Joi.object({
  specialization: Joi.string(),
  experience_yrs: Joi.number(),
  qualification: Joi.string(),
  status: Joi.boolean(),
  clinic_address: Joi.string(),
});
