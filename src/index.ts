import express, { Application, json } from "express";
import { AccountsRouter } from "./api/routes/accounts";
import cors from "cors";

const app: Application = express();
const PORT = process.env.PORT || 3000;
// Here go the routers
app.use(json());
app.use(cors());

app.use("/accounts", AccountsRouter);

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, async () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port: ${PORT}`);
  });
}

export default app; //Need to export the app for test purposes
