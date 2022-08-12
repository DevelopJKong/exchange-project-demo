import nodemailer from "nodemailer";
import { config } from "../config/config.js";

/** 이메일 관련 파리미터 및 함수 [시작] */
export const emailConfig = {
    service: "gmail",
    host: "smtp.gmail.com",
    port: "587",
    secure: false,
    auth: {
        user: config.google.mail,
        pass: config.google.password,
    },
};

export const sendMailer = async (data) => {
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