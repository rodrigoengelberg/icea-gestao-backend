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
    const findMember = await this.ormRepository.findOne(id)

    return findMember
  }

  public async findByMemberId(member_id: string): Promise<MemberDetails | undefined> {
    const findMember = await this.ormRepository.findOne({
      where: { member_id },
    })

    return findMember
  }

  public async create(memberDetailsData: ICreateMemberDetailsDTO): Promise<MemberDetails> {
    const memberDetails = this.ormRepository.create(memberDetailsData)

    await this.ormRepository.save(memberDetails)

    return memberDetails
  }

  public async save(user: MemberDetails): Promise<MemberDetails> {
    return this.ormRepository.save(user)
  }
}

export default MembersDetailsRepository
