import { NextFunction, Request, Response } from "express";

export function asyncController(controller: (req: Request, res: Response) => Promise<void>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res)
    } catch (err) {
      next(err)
    }
  }
}
