import nodemailer from "nodemailer";
import config from "../config";

const sendMail = async (to: String, content) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.sendmailAddress,
      pass: config.sendmailPassword,
    },
  });

  // Use the transporter to send emails
  try {
    const res = await transporter.sendMail({
      from: config.frommailAddress,
      to,
      subject: "Email Verification",
      html: content,
    });
  } catch (error) {
    console.log(error);
  }
};

export default sendMail;

