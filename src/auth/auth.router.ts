import express from "express";
import {AuthService} from "./auth.service";

const service = new AuthService();
export const authRouter = express.Router();

authRouter.post("/register", service.register);
authRouter.post("/login", service.login);
