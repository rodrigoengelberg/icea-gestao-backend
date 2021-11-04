import { injectable, inject } from 'tsyringe'

import Member from '@modules/members/infra/typeorm/entities/Member'
import IMembersRepository from '@modules/members/repositories/IMembersRepository'

@injectable()
class ListMembersService {
  constructor(
    @inject('MembersRepository')
    private membersRepository: IMembersRepository
  ) {}

  public async execute(): Promise<Member[]> {
    let members = await this.membersRepository.findAll()

    return members
  }
}

export default ListMembersService
