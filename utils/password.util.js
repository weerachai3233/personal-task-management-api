const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); // Dynamically generate a secure salt
  return await bcrypt.hash(password, salt); // Hash the password with the generated salt
};

const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    return false; 
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};
