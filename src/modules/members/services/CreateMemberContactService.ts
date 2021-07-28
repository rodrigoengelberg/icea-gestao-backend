import { injectable, inject } from 'tsyringe'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import ICreateMemberContactDTO from '../dtos/ICreateMemberContactDTO'
import MemberContact from '../infra/typeorm/entities/MemberContact'
import IMembersContactRepository from '../repositories/IMembersContactRepository'

@injectable()
class CreateMemberService {
  constructor(
    @inject('MembersContactRepository')
    private membersContactRepository: IMembersContactRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }

  public async execute(memberData: ICreateMemberContactDTO): Promise<MemberContact> {

    const memberContactData = await this.membersContactRepository.create(memberData)

    await this.cacheProvider.invalidatePrefix('membersContact-list');

    return memberContactData
  }
}

export default CreateMemberService
