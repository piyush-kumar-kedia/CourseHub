import { Request, Response, NextFunction } from "express";
import { IAdmin, ICreateAdminRequest } from "./admin.schema";
import services from "./admin.service";

async function getAdminDetails(req: Request, res: Response, next: NextFunction) {
    const user: IAdmin = req.user;

    return res.json({
        username: user.name,
        email: user.email,
    });
}

async function createAdmin(
    req: Request<{}, {}, ICreateAdminRequest>,
    res: Response,
    next: NextFunction
) {
    const { body } = req;
    const newAdmin = await services.createNewAdmin(body);
    res.json({
        created: true,
        user: newAdmin,
    });
}

export default { createAdmin, getAdminDetails };
