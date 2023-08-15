import express from "express";
import {ContactsService} from "./contacts.service";
import authMiddleware from "../middlewares/auth.middleware";

const service = new ContactsService();
export const contactsRouter = express.Router();

contactsRouter.post("/addContact", authMiddleware, service.addContact);
