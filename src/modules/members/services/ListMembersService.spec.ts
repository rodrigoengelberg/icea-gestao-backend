import FakeMembersRepository from '@modules/members/repositories/fakes/FakeMembersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListMembersService from './ListMembersService';

let fakeMembersRepository: FakeMembersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listMembers: ListMembersService;

describe('ListMembers', () => {
  beforeEach(() => {
    fakeMembersRepository = new FakeMembersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listMembers = new ListMembersService(
      fakeMembersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the members', async () => {
    const member1 = await fakeMembersRepository.create({
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      gender: 'Male',
      member_type: 'Ativo',
      marital_status: 'Casado',
      nationality: 'Brasileiro',
      birth_date: new Date()
    });

    const member2 = await fakeMembersRepository.create({
      first_name: 'John',
      last_name: 'Tru',
      email: 'johntru@example.com',
      gender: 'Male',
      member_type: 'Ativo',
      marital_status: 'Solteiro',
      nationality: 'Brasileiro',
      birth_date: new Date()
    });

    const members = await listMembers.execute();

    expect(members).toEqual([member1, member2]);
  });
});
