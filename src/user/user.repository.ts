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

  findById(id: number) {
    return User.findOne({ where: { id } })
  }
}
