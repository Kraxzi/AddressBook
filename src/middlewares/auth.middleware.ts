import "dotenv/config";
import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import {postgresDB} from "../db/pg.connection";

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({message: "Unauthorized"});
  }

  try {
    const decodedToken: any = jwt.verify(token, String(process.env.JWT_SECRET));
    const user = await postgresDB("users")
      .where({id: decodedToken.id, email: decodedToken.email})
      .first();

    if (!user) {
      return res.status(403).json({message: "Forbidden"});
    }

    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(403).json({message: "Forbidden"});
  }
}
