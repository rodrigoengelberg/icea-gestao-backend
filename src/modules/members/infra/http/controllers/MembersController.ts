import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import CreateMemberService from '@modules/members/services/CreateMemberService'
import UpdateMemberService from '@modules/members/services/UpdateMemberService'
import ShowMembersService from '@modules/members/services/ShowMembersService'
import ShowMembersByIdService from '@modules/members/services/ShowMembersByIdService'
import DeleteMemberService from '@modules/members/services/DeleteMemberService'

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

  public async delete(request: Request, response: Response): Promise<Response> {
    const member_id = request.params.member_id;

    const deleteMember = container.resolve(DeleteMemberService);

    const responseDeleted = await deleteMember.execute({
      member_id,
    });

    return response.json(classToClass(responseDeleted));
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
      member_contact,
      member_details,
      member_spiritual
    } = request.body

    const createMember = container.resolve(CreateMemberService)

    const member = await createMember.execute({
      first_name,
      full_name,
      email,
      gender,
      marital_status,
      nationality,
      birth_date,
      member_contact,
      member_details,
      member_spiritual
    })

    return response.json(classToClass(member))
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const member_id = request.params.member_id
    const {
      first_name,
      full_name,
      email,
      gender,
      marital_status,
      nationality,
      birth_date,
      member_contact,
      member_details,
      member_spiritual
    } = request.body

    const updateMember = container.resolve(UpdateMemberService)

    const member = await updateMember.execute({
      member_id,
      first_name,
      full_name,
      email,
      gender,
      marital_status,
      nationality,
      birth_date,
      member_contact,
      member_details,
      member_spiritual
    });

    return response.json(classToClass(member));
  }

}
