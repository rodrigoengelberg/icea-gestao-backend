import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import CreateMemberContactService from '@modules/members/services/CreateMemberContactService'
import UpdateMemberContactService from '@modules/members/services/UpdateMemberContactService'
import ShowMembersService from '@modules/members/services/ShowMembersService'
import ShowMembersByIdService from '@modules/members/services/ShowMembersByIdService'
import DeleteMemberService from '@modules/members/services/DeleteMemberService'

export default class MembersContactController {
  public async show(request: Request, response: Response): Promise<Response> {
    const showMembers = container.resolve(ShowMembersService)

    const members = await showMembers.execute()

    return response.json(classToClass(members))
  }

  public async showById(
    request: Request,
    response: Response
  ): Promise<Response> {
    const member_id = request.params.member_id

    const showMembers = container.resolve(ShowMembersByIdService)

    const member = await showMembers.execute({
      member_id
    })

    return response.json(classToClass(member))
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const member_id = request.params.member_id

    const deleteMember = container.resolve(DeleteMemberService)

    const responseDeleted = await deleteMember.execute({
      member_id
    })

    return response.json(classToClass(responseDeleted))
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      member_id,
      address,
      state,
      city,
      zipcode,
      phone_type,
      phone_type_name,
      phone_number
    } = request.body

    const createMember = container.resolve(CreateMemberContactService)

    const member = await createMember.execute({
      member_id,
      address,
      state,
      city,
      zipcode,
      phone_type,
      phone_type_name,
      phone_number
    })

    return response.json(classToClass(member))
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const member_contact_id = request.params.member_contact_id

    const {
      member_id,
      address,
      state,
      city,
      zipcode,
      phone_type,
      phone_type_name,
      phone_number
    } = request.body

    const updateMember = container.resolve(UpdateMemberContactService)

    const member = await updateMember.execute({
      member_contact_id,
      member_id,
      address,
      state,
      city,
      zipcode,
      phone_type,
      phone_type_name,
      phone_number
    })

    return response.json(classToClass(member))
  }
}
