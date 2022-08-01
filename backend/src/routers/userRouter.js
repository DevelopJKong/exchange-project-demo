import express from "express";
import { getPage, postCheck, postEmailCheck, postJoin, postLogin } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.route("/join").post(postJoin);
userRouter.route("/check").post(postCheck);
userRouter.route("/login").post(postLogin);
userRouter.route("/emailCheck").post(postEmailCheck);

export default userRouter;
