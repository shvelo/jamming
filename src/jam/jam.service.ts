import { Inject, Service } from "typedi";
import { JamRepository } from "./jam.repository";

@Service()
export class JamService {
  @Inject()
  jamRepository!: JamRepository
  
  constructor() { }
}
