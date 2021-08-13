import ICreateMemberSpiritualDTO from '../dtos/ICreateMemberSpiritualDTO'
import MemberSpirutal from '../infra/typeorm/entities/MemberSpiritual'

export default interface IMembersSpiritualRepository {
  findById(id: string): Promise<MemberSpirutal | undefined>
  findByMemberId(memberId: string): Promise<MemberSpirutal | undefined>
  create(data: ICreateMemberSpiritualDTO): Promise<MemberSpirutal>
  save(memberSpirutal: MemberSpirutal): Promise<MemberSpirutal>
}
