import { Sequelize } from 'sequelize-typescript'

import { User, Jam } from '../models'

const databaseUrl = process.env.DB_URL

class DatabaseService {
  sequelize: Sequelize
  constructor() {
    if (!databaseUrl) {
      throw new Error('Missing Database URL')
    }

    this.sequelize = new Sequelize(databaseUrl, {
      models: [User, Jam],
      sync: {
        alter: true,
      },
    })
  }

  sync() {
    return this.sequelize.sync()
  }
}

export default new DatabaseService()
