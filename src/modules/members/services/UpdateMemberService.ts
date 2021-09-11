import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import Member from '../infra/typeorm/entities/Member'
import IMembersRepository from '../repositories/IMembersRepository'

interface IRequestMemberContact {
  id?: string
  member_id?: string
  address: string
  state: string
  city: string
  zipcode: number
  phone_type: number
  phone_type_name: string
  phone_number: number
}

interface IRequestMemberSpiritual {
  id?: string
  member_id?: string
  member_function: string
  member_status: string
  baptism_date: Date
  joined_date: Date
  tithe_member: number
  problems: string
  testimony: string
}

interface IRequest {
  member_id: string
  first_name: string
  full_name: string
  email: string
  gender: string
  marital_status: string
  nationality: string
  birth_date: Date
  occupation: string
  schooling: string
  facebook_link: string
  instagram_link: string
  avatar: string
  member_contact: IRequestMemberContact
  member_spiritual: IRequestMemberSpiritual
}

@injectable()
class UpdateMemberService {
  constructor(
    @inject('MembersRepository')
    private membersRepository: IMembersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    member_id,
    first_name,
    full_name,
    email,
    gender,
    marital_status,
    nationality,
    birth_date,
    occupation,
    schooling,
    facebook_link,
    instagram_link,
    avatar,
    member_contact,
    member_spiritual
  }: IRequest): Promise<Member> {
    const member = await this.membersRepository.findById(member_id)

    if (!member) {
      throw new AppError('Member not found')
    }

    const checkUserExists = await this.membersRepository.findByEmail(email)

    if (checkUserExists && checkUserExists.id !== member_id) {
      throw new AppError('Email address already used.')
    }

    Object.assign(
      member,
      { id: member_id },
      {
        first_name,
        full_name,
        email,
        gender,
        marital_status,
        nationality,
        birth_date,
        occupation,
        schooling,
        facebook_link,
        instagram_link,
        avatar,
        member_contact,
        member_spiritual
      }
    )

    await this.membersRepository.save(member)

    await this.cacheProvider.invalidatePrefix('members-list')

    return member
  }
}

export default UpdateMemberService
