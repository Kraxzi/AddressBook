import "dotenv/config";
import express, {Express} from "express";
import {authRouter} from "./auth/auth.router";
import {contactsRouter} from "./contacts/contacts.router";

export const app: Express = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/contacts", contactsRouter);

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
