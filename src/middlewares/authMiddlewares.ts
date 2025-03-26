import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwd";

interface UserPayload {
  id: string;
  role?: string;
}

declare module "express-serve-static-core" {
  interface Request {
    user?: UserPayload;
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = verifyToken(token) as UserPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export const authorize =
  (role: string) =>
  (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user || req.user.role !== role) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }
    next();
  };
