import ICreateMemberContactDTO from '../dtos/ICreateMemberContactDTO'
import MemberContact from '../infra/typeorm/entities/MemberContact'

export default interface IMembersContactRepository {
  findById(id: string): Promise<MemberContact | undefined>
  findByMemberId(memberId: string): Promise<MemberContact | undefined>
  create(data: ICreateMemberContactDTO): Promise<MemberContact>
  save(user: MemberContact): Promise<MemberContact>
}
