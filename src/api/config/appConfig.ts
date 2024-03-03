import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`),
});

export const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  MAILER_MAIL: process.env.MAILER_MAIL,
  MAILER_PASS: process.env.MAILER_PASS
};
