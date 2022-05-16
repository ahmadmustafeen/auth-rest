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
};
