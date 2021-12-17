import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import IMembersRepository from '../repositories/IMembersRepository'

interface IRequest {
  member_id: string
}

@injectable()
class DeleteMemberService {
  constructor(
    @inject('MembersRepository')
    private membersRepository: IMembersRepository
  ) {}

  public async execute({ member_id }: IRequest): Promise<any> {
    const member = await this.membersRepository.findById(member_id)

    if (!member) {
      throw new AppError('Something wrong to delete this member')
    }

    await this.membersRepository.delete(member_id)

    return { message: 'Member deleted succesfull' }
  }
}

export default DeleteMemberService
