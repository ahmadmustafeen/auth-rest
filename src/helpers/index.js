module.exports = {
  ApiResponse: (data, message = "Success", status = true) => {
    return {
      data: data,
      message,
      status,
    };
  },
  validate: (body, requiredFields) => {
    const missingFields = requiredFields.filter((field) => !body[field]);
    return missingFields.length ? missingFields : false;
  },
  sendEmail: async (to, header, content) => {
    var nodemailer = require("nodemailer");
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.user_email,
        pass: process.env.user_password,
      },
    });

    var mailOptions = {
      from: process.env.user_email,
      to: to,
      subject: header,
      text: content,
    };
    let resolved = true;
    transporter.sendMail(mailOptions, function (error, info) {
      if (info) {
        resolved = true;
      } else {
        resolved = false;
      }
    });
    return resolved;
  },
};
