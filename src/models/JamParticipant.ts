import { Table, Column, Model, HasMany, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { Jam, User } from '.'

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
