const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");

// const { SECRET_KEY } = require('../config');

module.exports = (context) => {
  // 'context' is going to be an object which is going to have, among other things, 'headers' inside of it. and inside of the 'headers' we need to get the authorization header.
  const authHeader = context.req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split("Bearer ")[1];

    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired token.");
      }
    }

    throw new Error("Authentication token must have form 'Bearer [token]'.");
  }

  throw new Error("Authorization header must be provided.");
};
