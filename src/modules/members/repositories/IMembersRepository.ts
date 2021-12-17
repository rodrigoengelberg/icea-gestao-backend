import ICreateMemberDTO from '../dtos/ICreateMemberDTO'
import Member from '../infra/typeorm/entities/Member'

export default interface IMembersRepository {
  findById(id: string): Promise<Member | undefined>
  findAll(): Promise<Member[] | undefined>
  findByEmail(email: string): Promise<Member | undefined>
  findByMemberFunctionAndStatus(memberFunction: string, memberStatus: string): Promise<Member[] | undefined>
  delete(id: string): Promise<Member | undefined>
  create(data: ICreateMemberDTO): Promise<Member>
  save(member: Member): Promise<Member>
}
