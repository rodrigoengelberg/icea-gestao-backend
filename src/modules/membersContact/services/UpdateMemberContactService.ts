import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import MemberContact from '../infra/typeorm/entities/MemberContact'
import IMembersContactRepository from '../repositories/IMembersContactRepository'

interface IRequest {
  member_contact_id: string
  member_id: string
  address: string
  state: string
  city: string
  zipcode: number
  phone_type: number
  phone_type_name: string
  phone_number: number
}

@injectable()
class UpdateMemberContactService {
  constructor(
    @inject('MembersContactRepository')
    private membersContactRepository: IMembersContactRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    member_contact_id,
    member_id,
    address,
    state,
    city,
    zipcode,
    phone_type,
    phone_type_name,
    phone_number
  }: IRequest): Promise<MemberContact> {
    const memberContact = await this.membersContactRepository.findById(
      member_contact_id
    )

    if (!memberContact) {
      throw new AppError('Member Contact not found')
    }

    Object.assign(
      memberContact,
      { id: member_contact_id },
      {
        member_id,
        address,
        state,
        city,
        zipcode,
        phone_type,
        phone_type_name,
        phone_number
      }
    )

    await this.membersContactRepository.save(memberContact)

    await this.cacheProvider.invalidatePrefix('membersContact-list')

    return memberContact
  }
}

export default UpdateMemberContactService
