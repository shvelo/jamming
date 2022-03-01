import { Table, Column, Model, HasMany } from 'sequelize-typescript'
import { UserJWTPayload } from '../common/interfaces'

@Table
export class User extends Model {
  static fromJWTPayload(payload: UserJWTPayload) {
    return User.build({
      name: payload.name,
    })
  }

  @Column
  name!: string
}
