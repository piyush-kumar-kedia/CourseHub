import express, { json } from "express";
import axios from "axios";
import fs from "fs";
const router = express.Router();
const client_id = "c6c864ac-cced-4be6-8657-ca15170e7b51";
const redirect_uri = "http://localhost:8080/login/redirect/";
const scope = "User.read offline_acess Mail.read";
import qs from "querystring";
import dotenv from "dotenv";
import { userInfo } from "os";

dotenv.config();
const clientid = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_VALUE;

router.get("/login", (req, res) => {
  res.redirect(
    `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=offline_access%20user.read%20mail.read&state=12345&prompt=consent`
  );
});

router.get("/login/redirect/", (req, res) => {
  const { code } = req.query;
  var data = qs.stringify({
    client_secret: clientSecret,
    client_id: clientid,
    redirect_uri: redirect_uri,
    scope: "user.read",
    grant_type: "authorization_code",
    code: code,
  });
  var config = {
    method: "post",
    url: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      client_secret: "hXv8Q~2wG_7tnfuJCQhRl_MC3vyXN-u1e2Wewa0g",
    },
    data: data,
  };
  axios(config)
    .then(({ data }) => {
      console.log(data);
      const AccessToken = data.access_token;
      const RefreshToken = data.refresh_token;

      fs.writeFileSync("./access-token", `${AccessToken}`, (err) => {
        if (err) throw new Error("Failed to write Acess Token" + err);
      });
      fs.writeFileSync("./refresh_token", `${RefreshToken}`, (err) => {
        if (err) throw new Error("Failed to write Refresh Token" + err);
      });
      return res.redirect("/homepage");
    })
    .catch((err) => {
      console.log(err);
    });
});
export default router;
