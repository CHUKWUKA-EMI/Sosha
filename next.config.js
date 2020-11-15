const dotenv = require("dotenv");

dotenv.config();

module.exports = {
	env: {
		RAPID_API_KEY: process.env.local.RAPID_API_KEY,
	},
	// distDir: 'build',
};
