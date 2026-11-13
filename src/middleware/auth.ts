import { Request, Response, NextFunction } from "express";
import { jwtVerify, createRemoteJWKSet } from "jose-cjs";

const JWKS = createRemoteJWKSet(
  new URL((process.env.CLIENT_URL || "http://localhost:3000") + "/api/auth/jwks")
);

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not logged in" });
  }

  const token = authHeader.split(" ")[1];

  try {
    await jwtVerify(token, JWKS);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
