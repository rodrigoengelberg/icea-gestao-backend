import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import Member from '../infra/typeorm/entities/Member'
import IMembersRepository from '../repositories/IMembersRepository'

interface IRequest {
  member_id: string
  first_name: string
  last_name: string
  email: string
  gender: string
  member_type: string
  marital_status: string
  nationality: string
  birth_date: Date
}

@injectable()
class UpdateMemberService {
  constructor(
    @inject('MembersRepository')
    private membersRepository: IMembersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }

  public async execute({ member_id, first_name, last_name, email, gender, member_type, marital_status, nationality, birth_date }: IRequest): Promise<Member> {

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
      { first_name, last_name, email, gender, member_type, marital_status, nationality, birth_date }
    )

    await this.membersRepository.save(member)

    await this.cacheProvider.invalidatePrefix('members-list')

    return member
  }
}

export default UpdateMemberService
