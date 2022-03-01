import { ApiError } from "./ApiError";

export class UnauthorizedError extends ApiError {
  constructor() {
    super(401, "Unauthorized")
  }
}
