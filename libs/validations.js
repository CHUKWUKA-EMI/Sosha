const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /(?=.*?[0-9])(?=.*?[A-Za-z]).+/;

// validate input field
const validations = (value, name, required = true, type, secondValue, max) => {
  // validation for required field
  if (required && !value) {
    return {
      message: `Your ${name} is required`,
      status: true,
    };
  }

  // validation for email field
  if (type === "email" && !emailRegex.test(value)) {
    return {
      message: `Your ${name} is invalid`,
      status: true,
    };
  }

  // validation for digit field
  if (type === "digits" && !/^[0-9]+$/.test(value)) {
    return {
      message: `Your ${name} must contain only numbers`,
      status: true,
    };
  }

  // validation for digit field
  if (type === "password" && value.length < 7) {
    return {
      message: `Your ${name} must be at least 7 characters long`,
      status: true,
    };
  }

  // validation for password
  if (type === "password" && value.length >= 7 && !passwordRegex.test(value)) {
    return {
      message: `Your ${name} must contain at least a number and a letter`,
      status: true,
    };
  }

  // validations for comparism
  if (type === "compare" && value !== secondValue) {
    return {
      message: `Your passwords do not match`,
      status: true,
    };
  }

  if (max) {
    if (value.trim().length > max) {
      return {
        message: `Your ${name} is too long`,
        status: true,
      };
    }
  }

  return { message: "", status: false };
};
export default validations;
