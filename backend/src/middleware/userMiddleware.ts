import { configDotenv } from "dotenv";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function userMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  configDotenv();
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, process.env.NEXTAUTH_SECRET!, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
  // @ts-ignore
    req.userId = decoded.id;
    next();
  });
}
