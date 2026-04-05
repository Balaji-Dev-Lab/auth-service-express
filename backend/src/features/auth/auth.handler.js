import { responseHelper } from "../../helpers/response.helpers.js";
import { authService } from "./auth.services.js";

const register = async (req, res, next) => {
  try {
    // validation was taken care of by the validation middleware, so we can safely assume that the data is valid at this point
    const { name, email, phone, password } = req.body;

    // first check if the user already exists using prisma then hash the password and save the user to the database

    const user = await authService.register({ name, email, phone, password });

    // send the response using the response helper
    return responseHelper.sendSuccess(
      res,
      201,
      "User registered successfully",
      {
        name: user.name,
        email: user.email,
      },
    );
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // login logic will go here, we will check if the user exists, then compare the password using bcrypt and if it matches we will generate a token and send it in the response header
    const { token, user } = await authService.login({ email, password });
    return responseHelper.sendSuccess(res, 200, "Login successful", {
      user,
      token,
    });
  } catch (error) {
    // console.log("LOGIN ERROR:", error);
    // return res.status(500).json({
    //   message: error.message,
    // });
    next(error);
  }
};

export const authHandler = {
  register,
  login,
};
