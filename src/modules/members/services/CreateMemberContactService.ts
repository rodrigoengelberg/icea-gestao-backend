import { injectable, inject } from 'tsyringe'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import MemberContact from '../infra/typeorm/entities/MemberContact'
import IMembersContactRepository from '../repositories/IMembersContactRepository'

interface IRequest {
  street: string
  state: string
  city: string
  zipcode: number
  phoneType: string
  phoneNumber: number
}

@injectable()
class CreateMemberService {
  constructor(
    @inject('MembersContactRepository')
    private membersContactRepository: IMembersContactRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }

  public async execute({ street, state, city, zipcode, phoneType, phoneNumber }: IRequest): Promise<MemberContact> {

    const memberContactData = await this.membersContactRepository.create({
      street,
      state,
      city,
      zipcode,
      phoneType,
      phoneNumber
    })

    await this.cacheProvider.invalidatePrefix('membersContact-list')

    return memberContactData
  }
}

export default CreateMemberService