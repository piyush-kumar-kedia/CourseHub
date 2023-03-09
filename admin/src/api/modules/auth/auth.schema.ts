import z from "zod";
import { Request } from "express";
import { IAdmin } from "../admin/admin.schema";
import { HydratedDocument } from "mongoose";
export interface IAuth {
    username: string;
    email: string;
    otp: number;
}

export interface AuthenticatedRequest extends Request {
    user: HydratedDocument<IAdmin>;
}

export const generateCodeRequestSchema = z
    .object({
        name: z.string().min(3).max(25),
        password: z.string().min(5),
    })
    .strict();

export type IGenerateCodeRequest = z.infer<typeof generateCodeRequestSchema>;

export const loginRequestSchema = z
    .object({
        name: z.string().min(3).max(25),
        otp: z.number(),
    })
    .strict();

export type ILoginRequest = z.infer<typeof loginRequestSchema>;
