// Utility function to mask email
export const maskEmail = (email) => {
  const [user, domain] = email.split("@");
  return `${user.slice(0, 2)}***@***${domain.slice(domain.indexOf("."))}`;
};

// Utility function to mask phone number
export const maskPhoneNumber = (phone) => {
  return `${phone.slice(0, 2)}******${phone.slice(-2)}`;
};

// Utility Function to mask the name 
export const maskName = (name) => {
  return `${name.slice(0, 2)}******${name.slice(-2)}`;
};

// Utility Function to mask the password 
export const maskPassword = (password) => {
  return `${password.slice(0, 1)}***********${password.slice(-1)}`;
};


