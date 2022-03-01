import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript'

@Table
export class Jam extends Model {
  @Column
  name!: string

  @Column(DataType.STRING)
  status!: JamStatus

  @Column
  startsAt!: Date
}

export enum JamStatus {
  pending = 'pending',
  started = 'started',
}
