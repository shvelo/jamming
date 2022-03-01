import { Service } from "typedi";
import { DatabaseService } from "../common/services/database.service";
import { Jam, JamParticipant } from "./models";

@Service()
export class JamRepository {
  constructor(
    databaseService: DatabaseService,
  ) {
    databaseService.addModels([Jam, JamParticipant])
  }
}
