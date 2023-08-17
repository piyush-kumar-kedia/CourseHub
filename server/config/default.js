import "dotenv/config";

export default {
    port: process.env.PORT || 8080,
    mongoURI: process.env.MONGO_URI,
    clientURL: process.env.CLIENT_URL,
    mobileURL: process.env.MOBILE_URL,
    jwtSecret: process.env.JWT_SECRET,
    aesKey: process.env.AESKEY,
    adminJwtSecret: "32rytfhgv456ryt43ertfgy45rtfhh",
    serverVersion: 1.2
};
