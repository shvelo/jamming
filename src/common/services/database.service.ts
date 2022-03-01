import { Model, ModelCtor, Sequelize } from 'sequelize-typescript'
import { Service } from 'typedi'

const databaseUrl = process.env.DB_URL

@Service()
export class DatabaseService {
  sequelize: Sequelize

  constructor() {
    if (!databaseUrl) {
      throw new Error('Missing Database URL')
    }

    this.sequelize = new Sequelize(databaseUrl, {
      sync: {
        alter: true,
      },
      logging: false,
    })
  }

  addModels(models: ModelCtor<Model<any, any>>[]) {
    this.sequelize.addModels(models)
  }

  sync() {
    return this.sequelize.sync()
  }
}
