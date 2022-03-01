import { ApiError } from "./ApiError";

export class NotFoundError extends ApiError {
  constructor(message = "Not found") {
    super(404, message)
  }
}
