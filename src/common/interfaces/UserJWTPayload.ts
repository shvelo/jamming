import { JwtPayload } from "jsonwebtoken";

export interface UserJWTPayload extends JwtPayload {
  name: string
}
