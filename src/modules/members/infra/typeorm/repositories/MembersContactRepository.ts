import { getRepository, Repository } from 'typeorm'

import IMembersContactRepository from '@modules/members/repositories/IMembersContactRepository'
import ICreateMemberContactDTO from '@modules/members/dtos/ICreateMemberContactDTO'

import MemberContact from '../entities/MemberContact'

class UsersRepository implements IMembersContactRepository {
  private ormRepository: Repository<MemberContact>

  constructor() {
    this.ormRepository = getRepository(MemberContact)
  }

  public async findById(id: string): Promise<MemberContact | undefined> {
    const findAppointment = await this.ormRepository.findOne(id)

    return findAppointment
  }

  public async findByMemberId(member_id: string): Promise<MemberContact | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { member_id },
    })

    return findAppointment
  }

  public async create(membersContactData: ICreateMemberContactDTO): Promise<MemberContact> {
    const memberContact = this.ormRepository.create(membersContactData)

    await this.ormRepository.save(memberContact)

    return memberContact
  }

  public async save(membersContact: MemberContact): Promise<MemberContact> {
    return this.ormRepository.save(membersContact)
  }
}

export default UsersRepository
