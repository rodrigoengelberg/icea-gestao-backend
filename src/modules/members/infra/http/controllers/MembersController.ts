import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateMemberService from '@modules/members/services/CreateMemberService';

export default class SessionsController {
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
    } = request.body;

    const createUser = container.resolve(CreateMemberService);

    const user = await createUser.execute({
      first_name,
      last_name,
      email,
      gender,
      member_type,
      marital_status,
      nationality,
      birth_date
    });

    return response.json(classToClass(user));
  }
}
