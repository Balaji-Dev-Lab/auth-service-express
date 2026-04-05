import prisma from "../../database/database.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async ({ email, name, phone, password }) => {
  // check if the user already exists using prisma then hash the password and save the user to the database
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    const error = new Error("User already exists");
    error.statusCode = 400;

    throw error;
  }

  // hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      phone,
      password: hashedPassword,
    },
  });

  return newUser;
};

const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 400;
    throw error;
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    const error = new Error("Invalid email or password");
    error.statusCode = 400;
    throw error;
  }

  // now generate the token once the password is valid and send it in response header
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "24h",
    },
  );
  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};

export const authService = {
  register,
  login,
};
