import { ZodError } from "zod";

const validationMiddleware = (schema) => (req, res, next) => {
  try {
    // We use parse to validate the body
    // If it fails, it throws an error that goes to the catch block
    const validatedData = schema.parse(req.body);

    req.body = validatedData; // Replace the original body with the validated data

    next();
  } catch (error) {
    // Check if the error is specifically from Zod
    if (error instanceof ZodError) {
      return res.status(400).json({
        success: false,
        errors: error.issues.map((issue) => ({
          path: issue.path.join("."), // Convert path array to a string for better readability
          message: issue.message,
        })),
      });
    }

    // Fallback for non-Zod errors (like syntax errors in JSON)
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default validationMiddleware;
