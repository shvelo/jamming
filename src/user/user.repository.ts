import { Inject, Service } from "typedi";
import { DatabaseService } from "../common/services/database.service";
import { User } from "./models";

@Service()
export class UserRepository {
  constructor(
    databaseService: DatabaseService
  ) {
    databaseService.addModels([User])
  }

  findById(id: number, withPassword = false) {
    if (withPassword) {
      return User.scope('withPassword').findByPk(id)
    }
    else {
      return User.findByPk(id)
    }
  }

  findByUsername(username: string, withPassword = false) {
    if (withPassword) {
      return User.scope('withPassword').findOne({ where: { username } })
    }
    else {
      return User.findOne({ where: { username } })
    }
  }
}
