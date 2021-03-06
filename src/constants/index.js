module.exports = {
  LOGIN_REQUIRED_FIELDS: ["email", "password"],
  REGISTERED_REQUIRED_FIELDS: [
    "firstName",
    "lastName",
    "email",
    "password",
    "phoneNumber",
  ],
  FORGET_PASSWORD_REQUIRED_FIELDS: ["email"],
  VERIFY_OTP_FIELDS: ["email", "otp"],
  RESET_PASSWORD_FIELDS: ["email", "password"],
};
