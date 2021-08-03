import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import CreateMemberDetailsService from '@modules/members/services/CreateMemberDetailsService'

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      avatar,
      occupation,
      schooling,
      facebook_link,
      instagram_link
    } = request.body

    const createMemberDetails = container.resolve(CreateMemberDetailsService)

    const memberDetails = await createMemberDetails.execute({
      avatar,
      occupation,
      schooling,
      facebook_link,
      instagram_link
    })

    return response.json(classToClass(memberDetails))
  }
}
