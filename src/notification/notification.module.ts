import { Inject, Service } from "typedi"
import { JamModule } from "../jam/jam.module"
import { UserModule } from "../user/user.module"
import { NotificationController } from "./notification.controller"
import { NotificationRepository } from "./notification.repository"
import { NotificationService } from "./notification.service"

@Service()
export class NotificationModule {
  @Inject()
  userModule!: UserModule

  @Inject()
  jamModule!: JamModule

  @Inject()
  notificationRepository!: NotificationRepository

  @Inject()
  notificationService!: NotificationService

  @Inject()
  notificationController!: NotificationController
}
