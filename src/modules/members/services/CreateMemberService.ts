import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import Member from '../infra/typeorm/entities/Member'
import IMembersRepository from '../repositories/IMembersRepository'

interface IRequestMemberContact {
  member_id?: string
  address: string
  state: string
  city: string
  zipcode: number
  phone_type_name: string
  phone_number: number
}

interface IRequestMemberSpiritual {
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
  first_name: string
  last_name: string
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
class CreateMemberService {
  constructor(
    @inject('MembersRepository')
    private membersRepository: IMembersRepository
  ) {}

  public async execute({
    first_name,
    last_name,
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
    const checkMemberExists = await this.membersRepository.findByEmail(email)

    if (checkMemberExists) {
      throw new AppError('Email address already used.')
    }

    const members = await this.membersRepository.create({
      first_name,
      last_name,
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
    })

    return members
  }
}

export default CreateMemberService
