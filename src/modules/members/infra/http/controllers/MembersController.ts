import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import CreateMemberService from '@modules/members/services/CreateMemberService'
import UpdateMemberService from '@modules/members/services/UpdateMemberService'
import ShowMembersService from '@modules/members/services/ShowMembersService'
import ShowMembersByIdService from '@modules/members/services/ShowMembersByIdService'

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
      last_name,
      email,
      gender,
      member_type,
      marital_status,
      nationality,
      birth_date
    } = request.body

    const createMember = container.resolve(CreateMemberService)

    const member = await createMember.execute({
      first_name,
      last_name,
      email,
      gender,
      member_type,
      marital_status,
      nationality,
      birth_date
    })

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
      birth_date
    } = request.body

    const updateProfile = container.resolve(UpdateMemberService)

    const member = await updateProfile.execute({
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

    return response.json(classToClass(member));
  }
}
