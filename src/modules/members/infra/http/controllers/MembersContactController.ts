import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import CreateMemberContactService from '@modules/members/services/CreateMemberContactService'

export default class MembersContactController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      street,
      state,
      city,
      zipcode,
      phoneType,
      phoneNumber
    } = request.body

    const createMemberContact = container.resolve(CreateMemberContactService)

    const memberContact = await createMemberContact.execute({
      street,
      state,
      city,
      zipcode,
      phoneType,
      phoneNumber
    })

    return response.json(classToClass(memberContact))
  }
}
