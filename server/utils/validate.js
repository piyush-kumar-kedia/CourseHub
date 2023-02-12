import Joi from "joi";

const validatePayload = (schema, obj) => {
    const joiSchema = Joi.object(schema);
    return joiSchema.validate(obj);
};

export default validatePayload;
