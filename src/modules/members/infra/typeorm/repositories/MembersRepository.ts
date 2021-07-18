import { getRepository, Repository } from 'typeorm'

import ICreateMemberDTO from '@src/modules/members/dtos/ICreateMemberDTO'
import IMembersRepository from '@src/modules/members/repositories/IMembersRepository'

import Member from '../entities/Member'

class MembersRepository implements IMembersRepository {
  private ormRepository: Repository<Member>

  constructor() {
    this.ormRepository = getRepository(Member)
  }

  public async findById(id: string): Promise<Member | undefined> {
    const findAppointment = await this.ormRepository.findOne(id)

    return findAppointment
  }

  public async findByEmail(email: string): Promise<Member | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { email },
    })

    return findAppointment
  }

  public async create(userData: ICreateMemberDTO): Promise<Member> {
    const user = this.ormRepository.create(userData)

    await this.ormRepository.save(user)

    return user
  }

  public async save(user: Member): Promise<Member> {
    return this.ormRepository.save(user)
  }
}

export default MembersRepository
