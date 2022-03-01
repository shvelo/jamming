import Container, { Inject, Service } from "typedi";
import { ForbiddenError, NotFoundError } from "../common/errors";
import { NotificationService } from "../notification/notification.service";
import { User } from "../user/models";
import { JamRepository } from "./jam.repository";
import { Jam, JamStatus } from "./models";

@Service()
export class JamService {
  @Inject()
  jamRepository!: JamRepository

  constructor() { }

  async getJam(jamId: number) {
    return this.jamRepository.findById(jamId)
  }

  async getJams(status?: JamStatus) {
    return this.jamRepository.findAll(status)
  }

  async getHostedJams(user: User) {
    return this.jamRepository.findAllByHost(user.id)
  }

  async createJam(params: Partial<Jam>, user: User) {
    const jam = Jam.build({
      name: params.name,
      hostId: user.id,
      status: JamStatus.pending,
    })
    return jam.save()
  }

  async startJam(jamId: number, user: User) {
    const jam = await this.getJam(jamId)
    if (!jam) {
      throw new NotFoundError('Jam not found!')
    }
    if (jam.hostId !== user.id) {
      throw new ForbiddenError('Jam can only be started by host!')
    }
    if (jam.status === JamStatus.started) {
      throw new ForbiddenError('Jam already started!')
    }
    if (!jam.participants?.length) {
      throw new ForbiddenError('Jam has no participants!')
    }
    jam.status = JamStatus.started
    await jam.save()
    this.notifyJamStarted(jam)
    return jam
  }

  notifyJamStarted(jam: Jam) {
    try {
      const notificationService = Container.get(NotificationService)
      notificationService.notifyJamStarted(jam)
    } catch (err) {
      console.error('Error occured while notifying jam participants', err)
    }
  }

  async joinJam(jamId: number, user: User) {
    return this.jamRepository.addParticipant(jamId, user.id)
  }
}
