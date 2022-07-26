import express from "express";
import { getPage, postJoin,postLogin } from "../controllers/userController.js";

const userRouter = express.Router();


userRouter.route("/join").post(postJoin);
userRouter.route("/login").post(postLogin);
userRouter.route("/").get(getPage);

export default userRouter;
