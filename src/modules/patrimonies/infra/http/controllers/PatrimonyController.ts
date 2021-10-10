import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import CreatePatrimoniesService from '@modules/patrimonies/services/CreatePatrimoniesService'
import UpdatePatrimonyService from '@modules/patrimonies/services/UpdatePatrimonyService'
import ShowPatrimoniesService from '@modules/patrimonies/services/ShowPatrimoniesService'
import ShowPatrimonyByIdService from '@modules/patrimonies/services/ShowPatrimonyByIdService'
import DeletePatrimonyService from '@modules/patrimonies/services/DeletePatrimonyService'

export default class PatrimonyController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showPatrimonies = container.resolve(ShowPatrimoniesService)

    const patrimonies = await showPatrimonies.execute()

    return response.json(classToClass(patrimonies))
  }

  public async showById(
    request: Request,
    response: Response
  ): Promise<Response> {
    const patrimony_id = request.params.patrimony_id

    const showPatrimonies = container.resolve(ShowPatrimonyByIdService)

    const patrimony = await showPatrimonies.execute({
      patrimony_id
    })

    return response.json(classToClass(patrimony))
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const patrimony_id = request.params.patrimony_id

    const deletePatrimony = container.resolve(DeletePatrimonyService)

    const responseDeleted = await deletePatrimony.execute({
      patrimony_id
    })

    return response.json(classToClass(responseDeleted))
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      description,
      accounting_classification,
      localization,
      observations
    } = request.body

    const createPatrimony = container.resolve(CreatePatrimoniesService)

    const patrimony = await createPatrimony.execute({
      description,
      accounting_classification,
      localization,
      observations
    })

    return response.json(classToClass(patrimony))
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const patrimony_id = request.params.patrimony_id
    const {
      description,
      accounting_classification,
      localization,
      observations
    } = request.body

    const updatePatrimony = container.resolve(UpdatePatrimonyService)

    const patrimony = await updatePatrimony.execute({
      patrimony_id,
      description,
      accounting_classification,
      localization,
      observations
    })

    return response.json(classToClass(patrimony))
  }
}
