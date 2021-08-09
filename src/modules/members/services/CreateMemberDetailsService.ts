import { injectable, inject } from 'tsyringe'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import MemberDetails from '../infra/typeorm/entities/MemberDetails'
import IMembersDetailsRepository from '../repositories/IMembersDetailsRepository'

interface IRequest {
  member_id: string
  avatar: string
  occupation: string
  schooling: string
  facebook_link: string
  instagram_link: string
}

@injectable()
class CreateMemberDetailsService {
  constructor(
    @inject('MembersDetailsRepository')
    private membersDetailsRepository: IMembersDetailsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }

  public async execute({ member_id, avatar, occupation, schooling, facebook_link, instagram_link }: IRequest): Promise<MemberDetails> {

    const memberDetails = await this.membersDetailsRepository.create({
      member_id,
      avatar,
      occupation,
      schooling,
      facebook_link,
      instagram_link
    })

    await this.cacheProvider.invalidatePrefix('membersDetails-list');

    return memberDetails
  }
}

export default CreateMemberDetailsService
