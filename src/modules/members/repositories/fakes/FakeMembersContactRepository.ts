import { uuid } from 'uuidv4'

import IMembersRepository from '@src/modules/members/repositories/IMembersRepository'
import ICreateMemberDTO from '@modules/members/dtos/ICreateMemberDTO'

import MemberContact from '../../infra/typeorm/entities/MemberContact'

class FakeUsersRepository implements IMembersRepository {
  private users: Member[] = []

  public async findById(id: string): Promise<MemberContact | undefined> {
    const findUser = this.users.find(user => user.id === id)

    return findUser
  }

  public async findByEmail(email: string): Promise<MemberContact | undefined> {
    const findUser = this.users.find(user => user.email === email)

    return findUser
  }

  public async create(userData: ICreateMemberDTO): Promise<MemberContact> {
    const user = new MemberContact()

    Object.assign(user, { id: uuid() }, userData)

    this.users.push(user)

    return user
  }

  public async save(user: Member): Promise<Member> {
    const findIndex = this.users.findIndex(findMember => findMember.id === user.id)

    this.users[findIndex] = user

    return user
  }
}

export default FakeUsersRepository
