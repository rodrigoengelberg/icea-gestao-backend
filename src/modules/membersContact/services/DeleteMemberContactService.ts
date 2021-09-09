import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import IMembersContactRepository from '../repositories/IMembersContactRepository'

interface IRequest {
  member_contact_id: string
}

@injectable()
class DeleteMemberContactService {
  constructor(
    @inject('MembersContactRepository')
    private membersContactRepository: IMembersContactRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ member_contact_id }: IRequest): Promise<any> {
    const memberContact = await this.membersContactRepository.findById(
      member_contact_id
    )

    if (!memberContact) {
      throw new AppError('Something wrong to delete this member contact')
    }

    await this.membersContactRepository.delete(member_contact_id)

    await this.cacheProvider.invalidatePrefix('membersContact-list')

    return { message: 'Member contact deleted succesfull' }
  }
}

export default DeleteMemberContactService
