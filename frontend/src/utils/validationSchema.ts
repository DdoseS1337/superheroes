import Joi from "joi";

const imagesArraySchema = Joi.array().items(Joi.string().uri());

const schema = Joi.object({
  id: Joi.number(),
  nickname: Joi.string().required(),
  real_name: Joi.string().required(),
  origin_description: Joi.string().required(),
  superpowers: Joi.array().items(Joi.string().required()).required(),
  catch_phrase: Joi.string().required(),
  heroimages: imagesArraySchema.required(),
});

export default schema;