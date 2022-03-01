import { WhereAttributeHash } from "sequelize/types";
import { Service } from "typedi";
import { DatabaseService } from "../common/services/database.service";
import { User } from "../user/models";
import { Jam, JamParticipant, JamStatus } from "./models";

@Service()
export class JamRepository {
  constructor(
    databaseService: DatabaseService,
  ) {
    databaseService.addModels([Jam, JamParticipant])
  }

  findAll(status?: JamStatus) {
    const where: WhereAttributeHash = {}
    if (status)
      where.status = status
    return Jam.findAll({ where })
  }

  findAllByHost(hostId: number) {
    return Jam.findAll({ where: { hostId } })
  }

  findById(id: number) {
    return Jam.findByPk(id, {
      include: [{ model: JamParticipant, include: [User] }]
    })
  }

  async addParticipant(jamId: number, userId: number) {
    // Avoid adding duplicate participants
    const existing = await JamParticipant.findOne({ where: { jamId, userId } })
    if (existing)
      return existing
    return JamParticipant.create({ jamId, userId })
  }

  update(id: number, params: Partial<Jam>) {
    return Jam.update(params, { where: { id } })
  }
}
