import { uuid } from 'uuidv4'

import IMembersRepository from '@modules/members/repositories/IMembersRepository'
import ICreateMemberDTO from '@modules/members/dtos/ICreateMemberDTO'

import Member from '../../infra/typeorm/entities/Member'

class FakeMembersRepository implements IMembersRepository {
  private members: Member[] = []

  public async findById(id: string): Promise<Member | undefined> {
    const findMember = this.members.find(member => member.id === id)

    return findMember
  }

  public async findAllMembers(): Promise<Member[] | undefined> {
    const findMembers = this.members

    return findMembers
  }

  public async findByEmail(email: string): Promise<Member | undefined> {
    const findMember = this.members.find(member => member.email === email)

    return findMember
  }

  // public async delete(member_id: string): Promise<Member | undefined> {
  //   const member = new Member()

  //   Object.assign(member, { id: uuid() }, memberData)

  //   this.members.slice(member)

  //   return member
  // }

  public async create(memberData: ICreateMemberDTO): Promise<Member> {
    const member = new Member()

    Object.assign(member, { id: uuid() }, memberData)

    this.members.push(member)

    return member
  }

  public async save(member: Member): Promise<Member> {
    const findIndex = this.members.findIndex(findMember => findMember.id === member.id)

    this.members[findIndex] = member

    return member
  }
}

export default FakeMembersRepository
