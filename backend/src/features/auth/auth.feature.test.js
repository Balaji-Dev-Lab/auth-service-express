import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../../index.js"; // Ensure your index.js exports the express app

describe("Auth Feature (Register & Login)", () => {
  // Generate a random 10-digit number for the phone field
  const randomPhone = Math.floor(
    1000000000 + Math.random() * 9000000000,
  ).toString();

  const userData = {
    name: "Balaji Test",
    email: `test${Date.now()}@example.com`,
    phone: randomPhone, // This ensures no 'Unique constraint' error
    password: "Password@123",
    confirmPassword: "Password@123",
  };

  it("should register a new user successfully", async () => {
    const res = await request(app).post("/api/auth/register").send(userData);

    expect(res.statusCode).toBe(201);
    // Based on your handler, 'data' contains 'name' and 'email' directly
    expect(res.body.data).toHaveProperty("email", userData.email);
    expect(res.body.data).toHaveProperty("name", userData.name);
  });

  it("should login the registered user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: userData.email,
      password: userData.password,
    });

    expect(res.statusCode).toBe(200);
    // Login returns the 'user' object and the 'token'
    expect(res.body.data.user).toHaveProperty("email", userData.email);
    expect(res.body.data).toHaveProperty("token");
  });
});
