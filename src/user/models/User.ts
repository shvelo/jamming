import { Table, Column, Model, DefaultScope, Scopes } from 'sequelize-typescript'

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
  @Column
  name!: string

  @Column
  role!: string

  // Hashed password
  @Column
  password!: string
}
