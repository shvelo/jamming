import express from 'express'
import { errorHandler } from './middleware'

export const router = express.Router()

router.use(errorHandler)
