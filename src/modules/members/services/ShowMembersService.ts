import { injectable, inject } from 'tsyringe'

import Member from '../infra/typeorm/entities/Member'
import IMembersRepository from '../repositories/IMembersRepository'

@injectable()
class ShowMembersService {
  constructor(
    @inject('MembersRepository')
    private membersRepository: IMembersRepository
  ) { }

  public async execute(): Promise<Member[]> {

    const members = await this.membersRepository.findAllMembers()

    return members
  }
}

export default ShowMembersService
