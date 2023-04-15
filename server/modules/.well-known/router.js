import { Router } from "express";

const router = Router();

router.get("/assetlinks.json", async (req, res, next) => {
    return res.json([{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target" : { "namespace": "android_app", "package_name": "com.codingclub.coursehub",
               "sha256_cert_fingerprints": ["27:C0:74:E7:D7:78:08:6C:B8:31:F3:05:48:4E:9B:A1:EA:6A:7E:9D:37:29:4E:07:D6:78:7A:4D:B8:0D:AE:D3"] }
}]);
});

export default router;
