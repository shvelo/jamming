import 'reflect-metadata';
import 'dotenv/config'
import express from 'express'
import { router } from './api'
import DatabaseService from './services/database.service';

const port: number = parseInt(process.env['NODE_PORT'] || '8000')
const hostname: string = process.env['NODE_HOSTNAME'] || 'localhost'

async function start() {
  console.log(`Connecting to database`)
  await DatabaseService.sync()
  console.log(`Database connection successful`)

  const app = express()

  app.use('/api', router)
  app.use('/health', (req, res) => res.status(204).end())

  app.listen(port, hostname)
  console.log(`Listening on http://${hostname}:${port}`)
}

start()
