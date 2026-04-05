/**
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code (200, 201, etc.)
 * @param {string} message - Success message
 * @param {Object} data - The actual payload (user, token, etc.)
 */
const sendSuccess = (res, statusCode, message, data = {}) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

// const sendSuccess = (res, statusCode, message, data = {}, headers = {}) => {
//   // set headers if provided
//   Object.entries(headers).forEach(([key, value]) => {
//     res.setHeader(key, value);
//   });

//   return res.status(statusCode).json({
//     success: true,
//     message,
//     data,
//   });
// };

// how to use this for say a user created success message with user.name,user.email is the data to be sent in the response
// sendSuccess(res, 201, "User created successfully", { name: user.name, email: user.email });
// for a login success message with token as not the data but the header of the response
// sendSuccess(res, 200, "Login successfully", {}, { Authorization: `Bearer ${token}` });

export const responseHelper = {
  sendSuccess,
  // sendError
};
