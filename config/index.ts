import dotenv from "dotenv";

dotenv.config();
export default {
  mongoURI: process.env.DATABASE,
  jwtSecret: process.env.JWTSECRET,
  apiVersion: process.env.APIVERSION,
  sendmailAddress: process.env.AUTHEMAILADDRESS,
  sendmailPassword: process.env.AUTHMAILPASSWORD,
  frommailAddress: process.env.FROMMAILADDRESS
};
