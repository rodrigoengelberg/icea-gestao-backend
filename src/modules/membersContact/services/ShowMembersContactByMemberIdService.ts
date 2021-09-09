import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import Member from '../infra/typeorm/entities/Member'
import IMembersRepository from '../repositories/IMembersRepository'

interface IRequest {
  member_id: string
}

@injectable()
class ShowMembersByIdService {
  constructor(
    @inject('MembersRepository')
    private membersRepository: IMembersRepository,
  ) { }

  public async execute({ member_id }: IRequest): Promise<Member> {
    const member = await this.membersRepository.findById(member_id)

    if (!member) {
      throw new AppError('Member not found')
    }

    return member
  }
}

export default ShowMembersByIdService
