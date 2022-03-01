import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../../common/errors/UnauthorizedError";
import AuthService from "../../services/auth.service";

export function auth(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) {
    return next(new UnauthorizedError())
  }

  const [method, token] = req.headers.authorization.split(' ')
  if (method !== 'Bearer') {
    return next(new UnauthorizedError())
  }

  try {
    req.user = AuthService.getUserFromJwt(token)
    next()
  } catch (err) {
    next(err)
  }
}
