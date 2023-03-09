import logger from "../utils/logger.js";
import AppError from "./appError.js";

const validate = (validator) => {
    return (req, res, next) => {
        const { error } = validator(req.body);
        if (error) {
            logger.error(error);
            return next(new AppError(400, "Invalid Request body"));
        }
        return next();
    };
};
export default validate;
