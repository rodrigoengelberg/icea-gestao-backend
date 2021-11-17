import { getRepository, Repository } from 'typeorm'

import ICreateMemberDTO from '@modules/members/dtos/ICreateMemberDTO'
import IMembersRepository from '@modules/members/repositories/IMembersRepository'

import Member from '../entities/Member'

class MembersRepository implements IMembersRepository {
  private ormRepository: Repository<Member>

  constructor() {
    this.ormRepository = getRepository(Member)
  }

  public async findById(id: string): Promise<Member | undefined> {
    const findMembers = await this.ormRepository.findOne(id)

    return findMembers
  }

  public async findAll(): Promise<Member[] | undefined> {
    const findMembers = await this.ormRepository.find({
      order: {
        first_name: 'ASC'
      }
    })

    return findMembers
  }

  public async findByEmail(email: string): Promise<Member | undefined> {
    if (!email || email !== '') return undefined

    const findMembers = await this.ormRepository.findOne({
      where: { email }
    })

    return findMembers
  }

  public async delete(id: string): Promise<Member | undefined> {
    const findMembers = await this.ormRepository.findOne(id)

    return this.ormRepository.remove(findMembers)
  }

  public async create(memberData: ICreateMemberDTO): Promise<Member> {
    const member = this.ormRepository.create(memberData)

    await this.ormRepository.save(member)

    return member
  }

  public async save(member: Member): Promise<Member> {
    return this.ormRepository.save(member)
  }
}

export default MembersRepository
