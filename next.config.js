/* eslint-disable no-undef */
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  env: {
    RAPID_API_KEY: process.env.RAPID_API_KEY,
    BACKEND_URL: process.env.BACKEND_URL,
    SUBSCRIPTIONS_ENDPOINT: process.env.SUBSCRIPTIONS_ENDPOINT,
    IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT,
    IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
  },
  // distDir: 'build',
  // webpack: (config) => {
  //   config.node = {
  //     fs: "empty",
  //   };
  //   return config;
  // },
};
