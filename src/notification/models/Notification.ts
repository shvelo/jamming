import { Table, Column, Model, BelongsTo, ForeignKey, DataType } from 'sequelize-typescript'
import { Jam } from '../../jam/models'
import { User } from '../../user/models'

export enum NotificationStatus {
  pending = 'pending',
  read = 'read'
}

export enum NotificationType {
  jamStarted = 'jamStarted'
}

@Table
export class Notification extends Model {
  @Column({ type: DataType.STRING, values: Object.values(NotificationStatus), defaultValue: NotificationStatus.pending })
  status!: NotificationStatus

  @Column
  content!: string

  @Column({ type: DataType.STRING, values: Object.values(NotificationType) })
  type!: NotificationType

  @ForeignKey(() => Jam)
  @Column(DataType.INTEGER)
  jamId?: number

  @BelongsTo(() => Jam, 'jamId')
  jam?: Jam

  @ForeignKey(() => User)
  @Column
  userId!: number

  @BelongsTo(() => User, 'userId')
  user?: User
}
