import express from "express";
import { AccountsController } from "../controllers/accounts";

const router = express.Router();
const accountsController = new AccountsController();

router.post("/", accountsController.createAccount);

export { router as AccountsRouter };
