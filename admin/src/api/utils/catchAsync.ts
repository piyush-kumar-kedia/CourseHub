import { NextFunction, Request, Response } from "express";
import { RequestHandler } from "express-serve-static-core";

export function catchAsync(fn: RequestHandler) {
    return function (req: Request, res: Response, next: NextFunction) {
        Promise.resolve(fn(req, res, next)).catch((e) => next(e));
    };
}
export default catchAsync;
