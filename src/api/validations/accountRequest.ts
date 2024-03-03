import Joi from "joi";

export const accountSchema = Joi.object({
  email: Joi.string().pattern(new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")).required(),
  fullName: Joi.string().required(),
  age: Joi.number().min(0).required(),
  userName: Joi.string().min(1).required(),
  country: Joi.string().required(),
});
