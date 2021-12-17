import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import Member from '../infra/typeorm/entities/Member'
import IMembersRepository from '../repositories/IMembersRepository'

interface IRequest {
  member_function: string
  member_status: string
}

@injectable()
class ShowMembersByFunctionAndStatus {
  constructor(
    @inject('MembersRepository')
    private membersRepository: IMembersRepository
  ) { }

  public async execute({ member_function, member_status }: IRequest): Promise<Member[]> {

    const members = await this.membersRepository.findByMemberFunctionAndStatus(member_function, member_status)

    if (!members) {
      throw new AppError('Members not found')
    }

    return members
  }
}

export default ShowMembersByFunctionAndStatus
