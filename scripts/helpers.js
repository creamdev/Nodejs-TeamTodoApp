const CryptoJs = require("crypto-js");
const JWT = require("jsonwebtoken");

const passwordToHash = (password) => {
  return CryptoJs.HmacSHA256(
    password,
    CryptoJs.HmacSHA1(password, "secret").toString()
  ).toString();
};

const generateAccessToken = (user) => {
  return JWT.sign(
    { name: user.email, ...user },
    "secretAccess",
    {
      expiresIn: "1w",
    }
  );
};


module.exports = {
  passwordToHash,
  generateAccessToken,
};