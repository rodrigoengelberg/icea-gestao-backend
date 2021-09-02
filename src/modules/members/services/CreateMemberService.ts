import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import Member from '../infra/typeorm/entities/Member'
import IMembersRepository from '../repositories/IMembersRepository'
import ICreateMemberContactDTO from '../dtos/ICreateMemberContactDTO'
import ICreateMemberDetailsDTO from '../dtos/ICreateMemberDetailsDTO'
import ICreateMemberSpiritualDTO from '../dtos/ICreateMemberSpiritualDTO'

interface IRequest {
  first_name: string
  full_name: string
  email: string
  gender: string
  marital_status: string
  nationality: string
  birth_date: Date
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
    birth_date
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
      birth_date
    })

    await this.cacheProvider.invalidatePrefix('members-list')

    return members
  }
}

export default CreateMemberService
