import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import Member from '../infra/typeorm/entities/Member'
import IMembersRepository from '../repositories/IMembersRepository'

interface IRequest {
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
}

@injectable()
class CreateMemberService {
  constructor(
    @inject('MembersRepository')
    private membersRepository: IMembersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
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
    avatar
  }: IRequest): Promise<Member> {
    const checkMemberExists = await this.membersRepository.findByEmail(email)

    if (checkMemberExists) {
      throw new AppError('Email address already used.')
    }

    const members = await this.membersRepository.create({
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
      avatar
    })

    await this.cacheProvider.invalidatePrefix('members-list')

    return members
  }
}

export default CreateMemberService
