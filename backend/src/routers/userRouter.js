import express from "express";
import { getPage, postCheck, postJoin, postLogin } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.route("/join").post(postJoin);
userRouter.route("/check").post(postCheck);
userRouter.route("/login").post(postLogin);
userRouter.route("/").get(getPage);

export default userRouter;
