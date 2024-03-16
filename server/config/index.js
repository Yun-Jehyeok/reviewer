const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  COOLSMS_APIKEY: process.env.COOLSMS_APIKEY,
  COOLSMS_APIKEY_SECRET: process.env.COOLSMS_APIKEY_SECRET,
  NODEMAILER_USER: process.env.NODEMAILER_USER,
  NODEMAILER_PASS: process.env.NODEMAILER_PASS,
};
