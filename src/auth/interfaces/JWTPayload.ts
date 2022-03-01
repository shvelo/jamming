import { JwtPayload } from "jsonwebtoken";

export interface JWTPayload extends JwtPayload {
  userId: number
}
