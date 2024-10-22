export const validatePassword = (password) => {
  // Check for minimum length (e.g., 8 characters)
  const isValidLength = password.length >= 8;

  // Check if the password contains at least one special character
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  const hasSpecialChar = specialCharRegex.test(password);

  // Check both conditions
  if (isValidLength && hasSpecialChar) {
    return true; // Password is valid
  } else {
    return false; // Password is invalid
  }
};
