import { Inject, Service } from "typedi"
import { auth } from "../auth/middleware"
import { asyncController } from "../common/api/helpers"
import { Router } from "../common/api/router"
import { User } from "../user/models"
import { NotificationStatus } from "./models"
import { NotificationService } from "./notification.service"

@Service()
export class NotificationController {
  @Inject()
  notificationService!: NotificationService

  getNotifications = asyncController(async (req, res) => {
    const user = res.locals.user as User
    const status = req.query.status as NotificationStatus
    const notifications = await this.notificationService.getNotifications(user, status)
    res.json(notifications)
  })

  markAllRead = asyncController(async (req, res) => {
    const user = res.locals.user as User
    await this.notificationService.markRead(user)
    res.status(200).end()
  })

  markRead = asyncController(async (req, res) => {
    const user = res.locals.user as User
    const notificationId = parseInt(req.params.notificationId)
    await this.notificationService.markRead(user, notificationId)
    res.status(200).end()
  })

  constructor(router: Router) {
    router.get('/notifications', auth, this.getNotifications)
    router.post('/notifications/read', auth, this.markRead)
    router.post('/notifications/:notificationId/read', auth, this.markRead)
  }
}
