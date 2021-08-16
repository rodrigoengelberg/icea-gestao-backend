import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Member from '@modules/members/infra/typeorm/entities/Member';
import IMembersRepository from '@modules/members/repositories/IMembersRepository';

@injectable()
class ListMembersService {
  constructor(
    @inject('MembersRepository')
    private membersRepository: IMembersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute(): Promise<Member[]> {
    let members = await this.cacheProvider.recover<Member[]>(`members-list`);

    if (!members) {
      members = await this.membersRepository.findAll();
    }

    await this.cacheProvider.save(`members-list`, members);

    return members;
  }
}

export default ListMembersService;
