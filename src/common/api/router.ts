import express, { RequestHandler } from 'express'
import { Service } from 'typedi'

@Service()
export class Router {
  router = express.Router()

  use(...args: any) {
    return this.router.use(...args)
  }

  get(path: string, ...handlers: RequestHandler[]) {
    console.log('Registering handler GET', path)
    return this.router.get(path, ...handlers)
  }

  post(path: string, ...handlers: RequestHandler[]) {
    console.log('Registering handler POST', path)
    return this.router.post(path, ...handlers)
  }

  put(path: string, ...handlers: RequestHandler[]) {
    console.log('Registering handler PUT', path)
    return this.router.put(path, ...handlers)
  }

  delete(path: string, ...handlers: RequestHandler[]) {
    console.log('Registering handler DELETE', path)
    return this.router.delete(path, ...handlers)
  }

  patch(path: string, ...handlers: RequestHandler[]) {
    console.log('Registering handler PATCH', path)
    return this.router.patch(path, ...handlers)
  }
}
