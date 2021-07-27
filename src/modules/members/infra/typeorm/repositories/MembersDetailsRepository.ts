import { getRepository, Repository } from 'typeorm'

import IMembersDetailsRepository from '@modules/members/repositories/IMembersDetailsRepository'
import ICreateMemberDetailsDTO from '@modules/members/dtos/ICreateMemberDetailsDTO'

import MemberDetails from '../entities/MemberDetails'

class MembersDetailsRepository implements IMembersDetailsRepository {
  private ormRepository: Repository<MemberDetails>

  constructor() {
    this.ormRepository = getRepository(MemberDetails)
  }

  public async findById(id: string): Promise<MemberDetails | undefined> {
    const findAppointment = await this.ormRepository.findOne(id)

    return findAppointment
  }

  public async findByMemberId(member_id: string): Promise<MemberDetails | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { member_id },
    })

    return findAppointment
  }

  public async create(userData: ICreateMemberDetailsDTO): Promise<MemberDetails> {
    const user = this.ormRepository.create(userData)

    await this.ormRepository.save(user)

    return user
  }

  public async save(user: MemberDetails): Promise<MemberDetails> {
    return this.ormRepository.save(user)
  }
}

export default MembersDetailsRepository
