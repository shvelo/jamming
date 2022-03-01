import { Table, Column, Model, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Jam } from '.'
import { User } from '../../user/models'

@Table
export class JamParticipant extends Model {
  @ForeignKey(() => Jam)
  @Column
  jamId!: number

  @BelongsTo(() => Jam, 'jamId')
  jam?: Jam

  @ForeignKey(() => User)
  @Column
  userId!: number

  @BelongsTo(() => User, 'userId')
  user?: User
}
