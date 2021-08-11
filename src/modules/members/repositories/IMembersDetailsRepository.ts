import ICreateMemberDetailsDTO from '../dtos/ICreateMemberDetailsDTO'
import MemberDetails from '../infra/typeorm/entities/MemberDetails'

export default interface IMembersDetailsRepository {
  findById(id: string): Promise<MemberDetails | undefined>
  findByMemberId(memberId: string): Promise<MemberDetails | undefined>
  create(data: ICreateMemberDetailsDTO): Promise<MemberDetails>
  save(memberDetails: MemberDetails): Promise<MemberDetails>
}
