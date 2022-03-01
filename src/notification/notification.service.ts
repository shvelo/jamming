import { Inject, Service } from "typedi"
import { JamService } from "../jam/jam.service"
import { Jam } from "../jam/models"
import { User } from "../user/models"
import { Notification, NotificationStatus, NotificationType } from "./models"
import { NotificationRepository } from "./notification.repository"

@Service()
export class NotificationService {
  @Inject()
  notificationRepository!: NotificationRepository
  @Inject()
  jamService!: JamService

  getNotifications(user: User, status?: NotificationStatus) {
    return this.notificationRepository.findByUserId(user.id, status)
  }

  markRead(user: User, notificationId?: number) {
    return this.notificationRepository.markRead(user.id, notificationId)
  }

  async notifyJamStarted(jam: Jam) {
    const notifications = jam.participants && jam.participants.map((participant) => {
      return {
        userId: participant.userId,
        jamId: participant.jamId,
        type: NotificationType.jamStarted,
        content: "Jam has started",
      }
    })
    if (notifications && notifications.length)
      return this.notificationRepository.createMany(notifications)
  }
}
