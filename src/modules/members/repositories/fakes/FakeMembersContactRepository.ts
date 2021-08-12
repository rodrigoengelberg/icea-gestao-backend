import { uuid } from 'uuidv4'

import IMembersContactRepository from '../IMembersContactRepository'
import ICreateMemberContactDTO from '@modules/members/dtos/ICreateMemberContactDTO'

import MemberContact from '../../infra/typeorm/entities/MemberContact'

class FakeMembersContactRepository implements IMembersContactRepository {
  private membersContact: MemberContact[] = []

  public async findById(id: string): Promise<MemberContact | undefined> {
    const findMemberContact = this.membersContact.find(memberContact => memberContact.id === id)

    return findMemberContact
  }

  public async findByMemberId(memberId: string): Promise<MemberContact | undefined> {
    const findMemberContact = this.membersContact.find(memberContact => memberContact.member_id === memberId)

    return findMemberContact
  }

  public async create(memberContactData: ICreateMemberContactDTO): Promise<MemberContact> {
    const memberContact = new MemberContact()

    Object.assign(memberContact, { id: uuid() }, memberContactData)

    this.membersContact.push(memberContact)

    return memberContact
  }

  public async save(memberContact: MemberContact): Promise<MemberContact> {
    const findIndex = this.membersContact.findIndex(findMemberContact => findMemberContact.id === memberContact.id)

    this.membersContact[findIndex] = memberContact

    return memberContact
  }
}

export default FakeMembersContactRepository
