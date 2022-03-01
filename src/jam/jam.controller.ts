import { Router } from "../common/api/router";
import { Inject, Service } from "typedi";
import { JamService } from "./jam.service";
import { Request, Response } from "express";
import { asyncController } from "../common/api/helpers";

@Service()
export class JamController {
  @Inject()
  jamService!: JamService

  getJam = asyncController(async (req, res) => {

  })

  constructor(router: Router) {
    router.get('/jam/:jamId', this.getJam)
  }
}
