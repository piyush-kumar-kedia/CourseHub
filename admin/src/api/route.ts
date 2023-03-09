import { Express } from "express";
// import userRoutes from "./modules/user/user.routes";
import adminRoutes from "./modules/admin/admin.routes";
import authRoutes from "./modules/auth/auth.routes";

function configRoutes(app: Express) {
    // app.use("/api/user", userRoutes);
    app.use("/api/admin", adminRoutes);
    app.use("/api/auth", authRoutes);
}

export default configRoutes;
