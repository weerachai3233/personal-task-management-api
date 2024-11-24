const bcrypt = require("bcryptjs");
const { hashPassword, comparePassword } = require("../../utils/password.util"); 

jest.mock("bcryptjs");

describe("Password Hashing Utility Functions", () => {
  const password = "securePassword123";
  const hashedPassword = "$2a$10$hashedmockvalue12345";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("hashPassword should generate a hashed password", async () => {
    bcrypt.genSalt.mockResolvedValue("mockSalt");
    bcrypt.hash.mockResolvedValue(hashedPassword);

    const result = await hashPassword(password);

    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith(password, "mockSalt");
    expect(result).toBe(hashedPassword);
  });

  test("comparePassword should correctly compare passwords", async () => {
    bcrypt.compare.mockResolvedValue(true);

    const result = await comparePassword(password, hashedPassword);

    expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
    expect(result).toBe(true);
  });

  test("comparePassword should return false for mismatched passwords", async () => {
    bcrypt.compare.mockResolvedValue(false);

    const result = await comparePassword("wrongPassword", hashedPassword);

    expect(bcrypt.compare).toHaveBeenCalledWith(
      "wrongPassword",
      hashedPassword
    );
    expect(result).toBe(false);
  });
});
