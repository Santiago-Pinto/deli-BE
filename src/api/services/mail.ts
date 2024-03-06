import nodemailer from "nodemailer";
import { MailOptions } from "../types/Mail";
import { config } from "../config/appConfig";
import fs from "fs";
import path from "path";
import { Account } from "../types/Account";

export class MailService {
  transporter: any;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: config.MAILER_MAIL,
        pass: config.MAILER_PASS,
      },
    });
  }

  sendMail = async (account: Account) => {
    const htmlTemplate = fs.readFileSync(path.join(__dirname, "../templates/welcome.html"), "utf-8");

    const mail: MailOptions = {
      from: process.env.MAILER_MAIL || "",
      to: account.email,
      subject: "Account creation",
      html: htmlTemplate.replace("[USER]", account.userName),
    };

    try {
      this.transporter.sendMail(mail);
    } catch (error: unknown) {
      throw new Error(`Mail service failed: ${error}`);
    }
  };
}
