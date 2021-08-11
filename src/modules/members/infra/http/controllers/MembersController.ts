import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import CreateMemberService from '@modules/members/services/CreateMemberService'
import UpdateMemberService from '@modules/members/services/UpdateMemberService'
import ShowMembersService from '@modules/members/services/ShowMembersService'
import ShowMembersByIdService from '@modules/members/services/ShowMembersByIdService'
import CreateMemberContactService from '@modules/members/services/CreateMemberContactService'

export default class MembersController {

  public async show(request: Request, response: Response): Promise<Response> {

    const showMembers = container.resolve(ShowMembersService);

    const members = await showMembers.execute();

    return response.json(classToClass(members));
  }

  public async showById(request: Request, response: Response): Promise<Response> {
    const member_id = request.params.member_id;

    const showMembers = container.resolve(ShowMembersByIdService);

    const member = await showMembers.execute({
      member_id,
    });

    return response.json(classToClass(member));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      first_name,
      full_name,
      email,
      gender,
      marital_status,
      nationality,
      birth_date,
      member_contact: {
        address,
        state,
        city,
        zipcode,
        phone_type,
        phone_type_name,
        phone_number
      }
    } = request.body

    const createMember = container.resolve(CreateMemberService)

    let member = await createMember.execute({
      first_name,
      full_name,
      email,
      gender,
      marital_status,
      nationality,
      birth_date
    })

    const member_id = member.id
    const createMemberContact = container.resolve(CreateMemberContactService)

    const member_contact = await createMemberContact.execute({
      member_id,
      address,
      state,
      city,
      zipcode,
      phone_type,
      phone_type_name,
      phone_number
    })

    member = Object.assign(member, member_contact)

    return response.json(classToClass(member))
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const member_id = request.params.member_id
    const {
      first_name,
      last_name,
      email,
      gender,
      member_type,
      marital_status,
      nationality,
      birth_date,
      member_contact: {
        address,
        state,
        city,
        zipcode,
        phoneType,
        phoneNumber
      }
    } = request.body

    const updateMember = container.resolve(UpdateMemberService)

    const member = await updateMember.execute({
      member_id,
      first_name,
      last_name,
      email,
      gender,
      member_type,
      marital_status,
      nationality,
      birth_date
    });

    //const updateMemberContact= container.resolve(UpdateMemberService)

    return response.json(classToClass(member));
  }

}
