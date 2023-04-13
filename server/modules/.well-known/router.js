import { Router } from "express";

const router = Router();

router.get("/assetlinks.json", async (req, res, next) => {
    return res.sendFile('/assetlinks.json')},
    ]);
});

export default router;
