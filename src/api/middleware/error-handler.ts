import { NextFunction, Request, Response } from "express";
import { ApiError } from "../../common/errors/ApiError";


export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) {
    return next(err)
  }

  if(err instanceof ApiError) {
    res.status(err.code).json({
      code: err.code,
      message: err.message,
    })
    return
  }

  console.error('unexpected error:', err)
  res.status(500).json({
    code: 500,
    message: err.message,
  })
}
