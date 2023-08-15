import "dotenv/config";
import {Request, Response} from "express";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import {postgresDB} from "../db/pg.connection";
import validator from "validator";

export class AuthService {
  private static generateAccessToken(id: number, email: string): string {
    return jwt.sign({id, email}, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const {email, password} = req.body;
      if (!email || !validator.isEmail(email)) {
        return res.status(401).json({message: "Invalid email"});
      }

      if (!password || password.length < 8) {
        return res.status(401).json({message: "Invalid password"});
      }
      const user = await postgresDB("users").where({email}).first();
      if (user) {
        return res
          .status(409)
          .json({message: `User with email: ${email} already exists`});
      }
      const hashPassword = await bcrypt.hash(password, 7);

      const userId = (
        await postgresDB("users").insert({email, password: hashPassword}, [
          "id",
        ])
      )[0].id;

      const token = AuthService.generateAccessToken(userId, email);

      return res
        .status(200)
        .json({message: `User's ${email} registration successful`, token});
    } catch (e) {
      console.error(e);
      return res.status(500).json({message: "Registration error"});
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const {email, password} = req.body;

      const user = await postgresDB("users").where("email", email).first("*");
      if (!user) {
        return res.status(404).json({message: "User not found"});
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({message: "Wrong password"});
      }

      const token = AuthService.generateAccessToken(user.id, user.email);
      return res.status(200).json({token});
    } catch (e) {
      console.error(e);
      return res.status(500).json({message: "Login error"});
    }
  }
}
