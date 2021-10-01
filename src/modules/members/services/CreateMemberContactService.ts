import { injectable, inject } from 'tsyringe'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import MemberContact from '../infra/typeorm/entities/MemberContact'
import IMembersContactRepository from '../repositories/IMembersContactRepository'

interface IRequest {
  member_id: string
  address: string
  state: string
  city: string
  zipcode: number
  phone_type_name: string
  phone_number: number
}

@injectable()
class CreateMemberService {
  constructor(
    @inject('MembersContactRepository')
    private membersContactRepository: IMembersContactRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    member_id,
    address,
    state,
    city,
    zipcode,
    phone_type_name,
    phone_number
  }: IRequest): Promise<MemberContact> {
    const memberContactData = await this.membersContactRepository.create({
      member_id,
      address,
      state,
      city,
      zipcode,
      phone_type_name,
      phone_number
    })

    await this.cacheProvider.invalidatePrefix('membersContact-list')

    return memberContactData
  }
}

export default CreateMemberService
