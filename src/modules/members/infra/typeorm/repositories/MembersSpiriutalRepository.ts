import { getRepository, Repository } from 'typeorm'

import IMembersSpiritualRepository from '@modules/members/repositories/IMembersSpiritualRepository'
import ICreateMemberSpiritualDTO from '@modules/members/dtos/ICreateMemberSpiritualDTO'

import MemberSpirutal from '../entities/MemberSpiritual'

class MembersSpiriutalRepository implements IMembersSpiritualRepository {
  private ormRepository: Repository<MemberSpirutal>

  constructor() {
    this.ormRepository = getRepository(MemberSpirutal)
  }

  public async findById(id: string): Promise<MemberSpirutal | undefined> {
    const findMemberSipirutal = await this.ormRepository.findOne(id)

    return findMemberSipirutal
  }

  public async findByMemberId(member_id: string): Promise<MemberSpirutal | undefined> {
    const findMemberSipirutal = await this.ormRepository.findOne({
      where: { member_id },
    })

    return findMemberSipirutal
  }

  public async create(data: ICreateMemberSpiritualDTO): Promise<MemberSpirutal> {
    const memberSipirutal = this.ormRepository.create(data)

    await this.ormRepository.save(memberSipirutal)

    return memberSipirutal
  }

  public async save(memberSipirutal: MemberSpirutal): Promise<MemberSpirutal> {
    return this.ormRepository.save(memberSipirutal)
  }
}

export default MembersSpiriutalRepository
