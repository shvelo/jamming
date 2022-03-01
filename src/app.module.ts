import express from "express"
import bodyParser from "body-parser"
import { Inject, Service } from "typedi"
import { AuthModule } from "./auth/auth.module"
import { errorHandler } from "./common/api/middleware/error-handler"
import { Router } from "./common/api/router"
import { DatabaseService } from "./common/services/database.service"
import { JamModule } from "./jam/jam.module"
import { UserModule } from "./user/user.module"
import { NotificationModule } from "./notification/notification.module"

@Service()
export class AppModule {
  @Inject()
  router!: Router

  @Inject()
  databaseService!: DatabaseService

  @Inject()
  jamModule!: JamModule

  @Inject()
  authModule!: AuthModule

  @Inject()
  userModule!: UserModule

  @Inject()
  notificationModule!: NotificationModule

  port: number = parseInt(process.env['NODE_PORT'] || '8000')
  hostname: string = process.env['NODE_HOSTNAME'] || 'localhost'

  async start() {
    console.log(`Connecting to database`)
    await this.databaseService.sync()
    console.log(`Database connection successful`)

    const app = express()

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))

    app.use('/api', this.router.router, errorHandler)
    app.use('/health', (req, res) => res.status(204).end())

    app.listen(this.port, this.hostname)
    console.log(`Listening on http://${this.hostname}:${this.port}`)
  }
}
