import "dotenv/config";
import cors from "cors";
import axios from "axios";
import express from "express";
import AppError from "./utils/appError.js";
import catchAsync from "./utils/catchAsync.js";
import logger from "./utils/logger.js";
import config from "./config/default.js";
import OauthRoutes from "./routes/Oauth.js";
import fs from "fs";

const app = express();
const PORT = config.port;

app.use(OauthRoutes);
app.use("/homepage", (req, res) => {
  let access_token;
  try {
    access_token = fs.readFileSync("./access-token", "utf-8");
  } catch (err) {
    console.log(err);
  }
  var config = {
    method: "get",
    url: "https://graph.microsoft.com/v1.0/me",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
  axios(config)
    .then(({ data }) => {
      console.log(data);
      const displayName = data.displayName;
      res.setHeader("Content-type", "text/html");
      res.write(`<h1>welcome  ${displayName} !!!!!</h1>`);
      res.send();
    })
    .catch((err) => console.log(err));
});

// Error handler
app.use((err, req, res, next) => {
  logger.error(err.message ? err.message : err);
  const { status = 500, message = "Something went wrong!" } = err;
  return res.status(status).json({
    error: true,
    message: message,
  });
});

app.listen(PORT, () => {
  logger.info(`Server on PORT ${PORT}`);
});
