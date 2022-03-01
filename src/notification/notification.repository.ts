import { WhereAttributeHash } from "sequelize/types"
import { Service } from "typedi"
import { DatabaseService } from "../common/services/database.service"
import { Notification, NotificationStatus } from "./models"

@Service()
export class NotificationRepository {
  constructor(
    databaseService: DatabaseService
  ) {
    databaseService.addModels([Notification])
  }

  async findByUserId(id: number, status?: NotificationStatus) {
    const where: WhereAttributeHash = {
      userId: id,
    }
    if (status)
      where.status = status
    return Notification.findAll({ where })
  }

  createMany(notifications: Partial<Notification>[]) {
    return Notification.bulkCreate(notifications)
  }

  markRead(userId: number, notificationId?: number) {
    const where: WhereAttributeHash = {
      userId,
    }
    if (notificationId)
      where.id = notificationId
    return Notification.update({ status: NotificationStatus.read }, { where: { userId } })
  }
}
