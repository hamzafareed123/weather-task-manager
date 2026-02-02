import Joi from "joi";

export const todoSchema = Joi.object({
  todoName: Joi.string().trim().required().messages({
    "string.empty": "Todo Name is Required",
    "any.required": "Todo Name is Required",
  }),

  description: Joi.string().allow("").max(500).optional().messages({
    "string.max": "Description must be at most 500 characters",
  }),
  status: Joi.string()
    .valid("pending", "completed", "canceled")
    .allow("")
    .default("pending"),
});
