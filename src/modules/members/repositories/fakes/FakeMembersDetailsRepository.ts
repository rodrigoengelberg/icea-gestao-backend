import { uuid } from 'uuidv4'

import IMembersDetailsRepository from '../IMembersDetailsRepository'
import ICreateMemberDetailsDTO from '@modules/members/dtos/ICreateMemberDetailsDTO'

import MemberDetails from '../../infra/typeorm/entities/MemberDetails'

class FakeMembersDetailsRepository implements IMembersDetailsRepository {
  private membersDetails: MemberDetails[] = []

  public async findById(id: string): Promise<MemberDetails | undefined> {
    const findUser = this.membersDetails.find(memberContact => memberContact.id === id)

    return findUser
  }

  public async findByMemberId(memberId: string): Promise<MemberDetails | undefined> {
    const findUser = this.membersDetails.find(memberContact => memberContact.member_id === memberId)

    return findUser
  }

  public async create(memberContactData: ICreateMemberDetailsDTO): Promise<MemberDetails> {
    const memberDetails = new MemberDetails()

    Object.assign(memberDetails, { id: uuid() }, memberContactData)

    this.membersDetails.push(memberDetails)

    return memberDetails
  }

  public async save(memberContact: MemberDetails): Promise<MemberDetails> {
    const findIndex = this.membersDetails.findIndex(findMemberContact => findMemberContact.id === memberContact.id)

    this.membersDetails[findIndex] = memberContact

    return memberContact
  }
}

export default FakeMembersDetailsRepository