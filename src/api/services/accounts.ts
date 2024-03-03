import { Account } from "../types/Account";
import { ConflictException } from "../types/exceptions/ConflictException";
import { Object } from "../utils/types";

export class AccountsService {
  db: Object; // Variable to simulate the database

  constructor() {
    this.db = {};
  }

  createAccount(accountData: Account) {
    if (accountData.email in this.db) {
      throw new ConflictException("Email is already taken");
    }

    this.db[accountData.email] = accountData;

    return accountData;
  }
}
