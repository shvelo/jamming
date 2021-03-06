import { ApiError } from "./ApiError";

export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized") {
    super(401, message)
  }
}
