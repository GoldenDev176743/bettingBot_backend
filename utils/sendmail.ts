import nodemailer from "nodemailer";

const sendMail = async (to: String, content) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "youth229031@gmail.com",
      pass: "mmpmwhqooqhuxryx",
    },
  });

  // Use the transporter to send emails
  try {
    const res = await transporter.sendMail({
      from: "youth229031@gmail.com",
      to,
      subject: "Email Verification",
      html: content,
    });
  } catch (error) {
    console.log(error);
  }
};

export default sendMail;

