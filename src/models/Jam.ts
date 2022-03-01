import { Table, Column, Model, HasMany, DataType, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { User } from '.'
import { JamParticipant } from './JamParticipant'

export enum JamStatus {
  pending = 'pending',
  started = 'started',
}
@Table
export class Jam extends Model {
  @Column
  name!: string

  @Column({ type: DataType.STRING, defaultValue: JamStatus.pending, values: Object.values(JamStatus) })
  status!: JamStatus

  @ForeignKey(() => User)
  @Column
  hostId!: number

  @BelongsTo(() => User, 'hostId')
  host?: User

  @HasMany(() => JamParticipant, 'jamId')
  participants?: JamParticipant[]

  @Column
  startsAt!: Date
}

