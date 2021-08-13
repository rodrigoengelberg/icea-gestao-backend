import { injectable, inject } from 'tsyringe'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import MemberSpirutal from '../infra/typeorm/entities/MemberSpiritual'
import IMembersSpiritualRepository from '../repositories/IMembersSpiritualRepository'

interface IRequest {
  member_id: string
  member_function: string
  member_status: string
  baptism_date: Date
  joined_date: Date
  tithe_member: number
  problems: string
  testimony: string
}

@injectable()
class CreateMemberSpiritualService {
  constructor(
    @inject('MembersSpiritualRepository')
    private membersSpiritualRepository: IMembersSpiritualRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }

  public async execute({
    member_id,
    member_function,
    member_status,
    baptism_date,
    joined_date,
    tithe_member,
    problems,
    testimony
  }: IRequest): Promise<MemberSpirutal> {

    const memberDetails = await this.membersSpiritualRepository.create({
      member_id,
      member_function,
      member_status,
      baptism_date,
      joined_date,
      tithe_member,
      problems,
      testimony
    })

    await this.cacheProvider.invalidatePrefix('membersSpiritual-list');

    return memberDetails
  }
}

export default CreateMemberSpiritualService
