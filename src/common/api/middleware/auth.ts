import { NextFunction, Request, Response } from "express";
import Container from "typedi";
import { AuthService } from "../../../auth/auth.service";
import { UnauthorizedError } from "../../errors/UnauthorizedError";

export function auth(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) {
    return next(new UnauthorizedError())
  }

  const [method, token] = req.headers.authorization.split(' ')
  if (method.toLowerCase() !== 'bearer') {
    return next(new UnauthorizedError())
  }

  try {
    req.user = Container.get(AuthService).getUserFromJwt(token)
    next()
  } catch (err) {
    next(err)
  }
}
