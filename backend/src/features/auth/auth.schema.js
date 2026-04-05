// auth related zod schemas

import { regex, z } from "zod";

// Reusable password validation to keep it DRY
const passwordValidation = z
  .string({
    required_error: "Password is required",
  })
  .nonempty("Password is required") // for empty string
  .min(6, "Password must be at least 6 characters")
  .max(30, "Password cannot exceed 30 characters")
  // Check for Lowercase
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  // Check for Uppercase
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  // Check for Number
  .regex(/[0-9]/, "Password must contain at least one number")
  // Check for Special Character
  .regex(
    /[@$!%*?&]/,
    "Password must contain at least one special character (@$!%*?&)",
  );

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name should be at least 3 characters long")
      .max(50, "Name should be at most 50 characters long"),
    email: z.string().email("Invalid email address"), // Fixed: z.string().email()
    phone: z
      .string()
      .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
    password: passwordValidation,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  // Note: Usually, for Login, you don't need the complex regex,
  // just check if it's the right password in the controller!
});
