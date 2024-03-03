import { Request, Response } from "express";
import { AccountsService } from "../services/accounts";
import { accountSchema } from "../validations/accountRequest";
import { statusCodes } from "../utils/statusCodes";
import { Account } from "../types/Account";
import { ConflictException } from "../types/exceptions/ConflictException";
import { MailService } from "../services/mail";

export class AccountsController {
  accountsService: AccountsService;
  mailService: MailService;

  constructor() {
    this.accountsService = new AccountsService();
    this.mailService = new MailService();
  }

  createAccount = async (request: Request, response: Response) => {
    const { body } = request;

    const { error, value } = accountSchema.validate(body);

    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(", ");
      return response.status(statusCodes.BAD_REQUEST).json({ error: errorMessage });
    }

    try {
      const account = this.accountsService.createAccount(value as Account);
      await this.mailService.sendMail(value as Account);
      return response.status(statusCodes.CREATED).json(account);
    } catch (error: unknown) {
      if (error instanceof ConflictException) {
        return response.status(statusCodes.CONFLICT).json({ error: error.message });
      }
    }

    return response.status(statusCodes.INTERNAL_SERVER_ERROR).send("Something went wrong");
  };
}
