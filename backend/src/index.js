import "dotenv/config";
import cors from "cors";

import express from "express";
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // allow only the frontend URL
    credentials: true, // needed if you use cookies later
  }),
);

// const allowedOrigins = [
//   "http://localhost:5173", // dev
//   "http://your-ec2-ip", // temporary
//   "https://yourdomain.com", // production (later)
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   }),
// );
app.use(express.json());

import globalErrorHandler from "./middlewares/error.middleware.js";

import authRouter from "./features/auth/auth.routes.js";
import userRouter from "./features/user/user.routes.js";

app.get("/", async (req, res) => {
  res.send(`Backend is running on port ${process.env.PORT}`);
});

app.use("/api/auth", authRouter);

app.use("/api/user", userRouter);

app.use(globalErrorHandler);

app.listen(process.env.PORT, () => {
  console.log(`server listening in port ${process.env.PORT}`);
});

export default app; // Export the app for testing purposes
