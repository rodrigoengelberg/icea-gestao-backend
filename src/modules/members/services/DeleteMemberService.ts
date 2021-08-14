import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import IMembersRepository from '../repositories/IMembersRepository'

interface IRequest {
  member_id: string
}

@injectable()
class CreateMemberService {
  constructor(
    @inject('MembersRepository')
    private membersRepository: IMembersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute({ member_id }: IRequest): Promise<any> {

    const member = await this.membersRepository.findById(member_id)

    if (!member) {
      throw new AppError('Something wrong to delete this member')
    }

    await this.membersRepository.delete(member_id)

    await this.cacheProvider.invalidatePrefix('members-list')

    return { message: 'Member deleted succesfull' }
  }
}

export default CreateMemberService
