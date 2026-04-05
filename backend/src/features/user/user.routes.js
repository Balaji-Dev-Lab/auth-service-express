import { Router } from "express";
const userRouter = Router();

userRouter.get("/home", async (req, res) => {
  res.send("welcome to user home page");
});

export default userRouter;
