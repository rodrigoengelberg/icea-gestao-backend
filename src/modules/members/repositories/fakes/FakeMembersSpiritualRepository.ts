import { uuid } from 'uuidv4'

import IMembersSpiritualRepository from '../IMembersSpiritualRepository'
import ICreateMemberSpiritualDTO from '@modules/members/dtos/ICreateMemberSpiritualDTO'

import MemberSpirutal from '../../infra/typeorm/entities/MemberSpirutal'

class FakeMembersSpiritualRepository implements IMembersSpiritualRepository {
  private membersSpiritual: MemberSpirutal[] = []

  public async findById(id: string): Promise<MemberSpirutal | undefined> {
    const findMemberSpiritual = this.membersSpiritual.find(memberContact => memberContact.id === id)

    return findMemberSpiritual
  }

  public async findByMemberId(memberId: string): Promise<MemberSpirutal | undefined> {
    const findMemberSpiritual = this.membersSpiritual.find(memberSpiritual => memberSpiritual.member_id === memberId)

    return findMemberSpiritual
  }

  public async create(memberSpiritualData: ICreateMemberSpiritualDTO): Promise<MemberSpirutal> {
    const memberSpirutal = new MemberSpirutal()

    Object.assign(memberSpirutal, { id: uuid() }, memberSpiritualData)

    this.membersSpiritual.push(memberSpirutal)

    return memberSpirutal
  }

  public async save(memberSpiritual: MemberSpirutal): Promise<MemberSpirutal> {
    const findIndex = this.membersSpiritual.findIndex(findMemberSpiritual => findMemberSpiritual.id === memberSpiritual.id)

    this.membersSpiritual[findIndex] = memberSpiritual

    return memberSpiritual
  }
}

export default FakeMembersSpiritualRepository
