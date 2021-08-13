import { injectable, inject } from 'tsyringe'

import Member from '../infra/typeorm/entities/Member'
import IMembersRepository from '../repositories/IMembersRepository'
import IMembersContactRepository from '../repositories/IMembersContactRepository'

@injectable()
class ShowMembersService {
  constructor(
    @inject('MembersRepository')
    private membersRepository: IMembersRepository,

    @inject('MembersContactRepository')
    private membersContactRepository: IMembersContactRepository
  ) { }

  public async execute(): Promise<Member[]> {

    const members = await this.membersRepository.findAllMembers()

    return members
  }
}

export default ShowMembersService
