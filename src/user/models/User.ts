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
  username!: string

  // Hashed password
  @Column
  password!: string

  @Column
  fullName!: string

  @Column
  role!: string

  
  // Hide password in JSON
  toJSON(): object {
    var values = { ...this.get() }
    delete values.password
    return values
  }
}
