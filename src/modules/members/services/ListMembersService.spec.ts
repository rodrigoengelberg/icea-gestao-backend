import FakeMembersRepository from '@modules/members/repositories/fakes/FakeMembersRepository'
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import ListMembersService from './ListMembersService'

let fakeMembersRepository: FakeMembersRepository
let fakeCacheProvider: FakeCacheProvider
let listMembers: ListMembersService

describe('ListMembers', () => {
  beforeEach(() => {
    fakeMembersRepository = new FakeMembersRepository()
    fakeCacheProvider = new FakeCacheProvider()

    listMembers = new ListMembersService(
      fakeMembersRepository,
      fakeCacheProvider
    )
  })

  it('should be able to list the members', async () => {
    const member1 = await fakeMembersRepository.create({
      first_name: 'John',
      full_name: 'John Doe',
      email: 'johndoe@example.com',
      gender: 'Male',
      marital_status: 'Casado',
      nationality: 'Brasileiro',
      birth_date: new Date(),
      occupation: 'Autônomo',
      schooling: 'Superior',
      facebook_link: 'facebook.com/johndole',
      instagram_link: 'instagram.com/johndole',
      avatar: '/endereco/avatar.png'
    })

    const member2 = await fakeMembersRepository.create({
      first_name: 'John',
      full_name: 'John Tru',
      email: 'johntru@example.com',
      gender: 'Male',
      marital_status: 'Solteiro',
      nationality: 'Brasileiro',
      birth_date: new Date(),
      occupation: 'Autônomo',
      schooling: 'Superior',
      facebook_link: 'facebook.com/johndole',
      instagram_link: 'instagram.com/johndole',
      avatar: '/endereco/avatar.png'
    })

    const members = await listMembers.execute()

    expect(members).toEqual([member1, member2])
  })
})
