import OTPGenerator from "otp-generator";
const OTP_LENGTH = 4;
const OTP_CONFIG = {
  digits: true,
  upperCaseAlphabets: false,
  lowerCaseAlphabets: false,
  specialChars: false,
};
const GenerateOTP = () => {
  const otp = OTPGenerator.generate(OTP_LENGTH, OTP_CONFIG);
  return otp;
};
export default GenerateOTP;
