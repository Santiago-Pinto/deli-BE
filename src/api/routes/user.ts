import express from "express";
import { UserController } from "../controllers/user";

const router = express.Router();
const userController = new UserController();

router.get("/", userController.getUsers);

export { router as UserRouter };
