import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { Verification } from "../models/Verification.js";
import { config } from "../config.js";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize";
import { mailTemplate } from "../common/email/mailTemplate.js";

/** 이메일 관련 파리미터 및 함수 [시작] */
const emailConfig = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: "587",
    secure: false,
    auth: {
        user: config.google.mail,
        pass: config.google.password,
    },
};

const sendMailer = async (data) => {
    const transporter = nodemailer.createTransport(emailConfig);
    transporter.sendMail(data, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            return info.response;
        }
    });
};

/** 이메일 관련 파리미터 및 함수 [끝]*/

export const getPage = (req, res) => {
    return res.send("hello");
};

export const postJoin = async (req, res) => {
    const { country, firstName, lastName, password, name, email, verified, recommendCode, birthNumber } = req.body;
    try {
        const exists = await User.findOne({
            where: { email },
        });
        if (exists) {
            return res.status(409).json({ message: `해당 이메일이 존재 합니다` });
        }

        // 신분증 인증,,계좌 1원 인증, 이메일 인증

        // 1.이메일 인증
        const codeNum = uuidv4();
        const mailVar = {
            form: `${process.env.GOOGLE_MAIL}`,
            to: email,
            subject: `${name}님 환영합니다!`,
            html: mailTemplate(email, codeNum),
        };

        const user = await User.create({
            email,
            password,
            name,
            country,
            verified,
            firstName,
            lastName,
            recommendCode,
            birthNumber,
        });

        await Verification.create({
            code: codeNum,
            user_id: user.id,
        });

        await sendMailer(mailVar);

        return res.status(201).json({ user });
    } catch (error) {
        return res.status(400).json({ message: `잘못 작성하였습니다 다시 작성해주세요` });
    }
};

export const postLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(200).json({ message: "존재하는 계정이 없습니다" });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(401).json({ message: "이메일이나 비밀번호가 틀렸습니다" });
        }

        const token = jwt.sign({ id: user.id }, config.jwt.secretKey, {
            expiresIn: config.jwt.expiresInSec,
        });
        return res.status(200).json({ token, email, verified: user.verified });
    } catch (error) {
        return res.status(400).json({ message: `잘못 작성하였습니다 다시 작성해주세요` });
    }
};

export const postCheck = async (req, res) => {
    const { email, checkEmail } = req.body;
    const user = await User.findOne({ where: { email } });
    const verification = await Verification.findOne({
        where: { user_id: user.id },
    });

    if (checkEmail === verification.code) {
        user.verified = true;
        await user.save();
    }
    return res.redirect(config.backend.url);
};

export const postEmailCheck = async (req, res) => {
    const { email } = req.body;
    console.log(email);
    try {
        if (!email.includes(".com")) {
            return res.json({ message: "이메일 형식이 아닙니다" });
        }

        const user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(409).json({ message: `해당 이메일이 존재 합니다` });
        }
        return res.status(200).json({ message: "가입 가능한 이메일입니다" });
    } catch (error) {
        return res.status(400).json({ message: `잘못 작성하였습니다 다시 작성해주세요` });
    }
};
