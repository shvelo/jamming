import { Table, Column, Model, HasMany, DefaultScope, Scopes } from 'sequelize-typescript'
import { Jam } from '.'
import { UserJWTPayload } from '../common/interfaces'
import { JamParticipant } from './JamParticipant'

@Table
@DefaultScope(() => ({
  attributes: {
    exclude: ['password']
  }
}))
@Scopes(() => ({
  withPassword: {
    attributes: {
      include: ['password']
    }
  }
}))
export class User extends Model {
  static fromJWTPayload(payload: UserJWTPayload) {
    return User.build({
      name: payload.name,
    })
  }

  @Column
  name!: string

  @Column
  role!: string

  @HasMany(() => Jam, 'hostId')
  hostedJams?: Jam[]

  @HasMany(() => JamParticipant, 'userId')
  participations?: JamParticipant[]

  // Hashed password
  @Column
  password!: string
}
