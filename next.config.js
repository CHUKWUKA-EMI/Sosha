const dotenv = require("dotenv");

dotenv.config();

module.exports = {
	env: {
		RAPID_API_KEY: process.env.RAPID_API_KEY,
		BACKEND_URL: process.env.BACKEND_URL,
	},
	// distDir: 'build',
};
