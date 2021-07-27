import ICreateMemberDTO from '../dtos/ICreateMemberDTO'
import Member from '../infra/typeorm/entities/Member'

export default interface IMembersRepository {
  findById(id: string): Promise<Member | undefined>
  findAllMembers(): Promise<Member[] | undefined>
  findByEmail(email: string): Promise<Member | undefined>
  create(data: ICreateMemberDTO): Promise<Member>
  save(user: Member): Promise<Member>
}
