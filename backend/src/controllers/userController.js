import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { config } from "../config.js";

export const getPage = (req, res) => {
    return res.send("hello");
};

export const postJoin = async (req, res) => {
    const { username, password, name, email, verified } = req.body;

    try {
        const exists = await User.findOne({ where: { email } });
        if (exists) {
            return res.status(409).json({ message: `해당 이메일이 존재 합니다` });
        }

        const hashPassword = await bcrypt.hash(password, 10);


        // 신분증 인증,,계좌 1원 인증, 이메일 인증

        const userId = await User.create({
            username,
            password: hashPassword,
            name,
            email,
            verified,
        });
        const token = jwt.sign({ id: userId.id }, config.jwt.secretKey, {
            expiresIn: config.jwt.expiresInSec,
        });
        return res.status(201).json({ token, email });
    } catch (error) {
        console.log(error);
    }
};

export const postLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password);

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "이메일이나 비밀번호가 틀렸습니다" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ message: "이메일이나 비밀번호가 틀렸습니다" });
        }
        const token = jwt.sign({ id: user.id }, config.jwt.secretKey, {
            expiresIn: config.jwt.expiresInSec,
        });
        return res.status(200).json({ token, email });
    } catch (error) {
        console.log(error);
    }
};
