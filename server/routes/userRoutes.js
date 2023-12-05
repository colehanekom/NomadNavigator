import express from "express";
import path from "path";
import { changePassword, requestPasswordReset, resetpassword, verifyEmail } from "../controllers/userContoller.js";

const router = express.Router();
const __dirname = path.resolve(path.dirname(""));

router.get("/verify/:userId/:token", verifyEmail);
//Password Reset
router.post("/request-passwordreset", requestPasswordReset);
router.get("/reset-password/:userId/:token", resetpassword);
router.post("/reset-password", changePassword);

router.get("/verified", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/build", "index.html"));
});

router.get("/resetpassword", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/build", "passwordreset.html")); 
});

export default router;