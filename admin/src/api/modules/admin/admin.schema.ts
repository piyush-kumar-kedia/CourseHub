import z from "zod";

export interface IAdminCore {
    name: string;
    email: string;
}

export interface IAdmin extends IAdminCore {
    password: string;
    token?: string;
}

export const createAdminRequestSchema = z
    .object({
        name: z.string().min(3).max(24),
        email: z.string().email(),
        password: z.string().min(5),
    })
    .strict();

// export interface ICreateAdminResponse {
//     created: boolean;
//     user: IAdmin;
// }

export type ICreateAdminRequest = z.infer<typeof createAdminRequestSchema>;
