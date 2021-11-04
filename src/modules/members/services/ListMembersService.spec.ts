import FakeMembersRepository from '@modules/members/repositories/fakes/FakeMembersRepository'
import ListMembersService from './ListMembersService'
import MemberContact from '../infra/typeorm/entities/MemberContact'
import MemberSpiritual from '../infra/typeorm/entities/MemberSpiritual'

let fakeMembersRepository: FakeMembersRepository
let listMembers: ListMembersService

describe('ListMembers', () => {
  beforeEach(() => {
    fakeMembersRepository = new FakeMembersRepository()

    listMembers = new ListMembersService(fakeMembersRepository)
  })

  it('should be able to list the members', async () => {
    const member1 = await fakeMembersRepository.create({
      first_name: 'John',
      last_name: 'John Doe',
      email: 'johndoe@example.com',
      gender: 'Male',
      marital_status: 'Casado',
      nationality: 'Brasileiro',
      birth_date: new Date(),
      occupation: 'Autônomo',
      schooling: 'Superior',
      facebook_link: 'facebook.com/johndole',
      instagram_link: 'instagram.com/johndole',
      avatar: '/endereco/avatar.png',
      member_contact: new MemberContact(),
      member_spiritual: new MemberSpiritual()
    })

    const member2 = await fakeMembersRepository.create({
      first_name: 'John',
      last_name: 'John Tru',
      email: 'johntru@example.com',
      gender: 'Male',
      marital_status: 'Solteiro',
      nationality: 'Brasileiro',
      birth_date: new Date(),
      occupation: 'Autônomo',
      schooling: 'Superior',
      facebook_link: 'facebook.com/johndole',
      instagram_link: 'instagram.com/johndole',
      avatar: '/endereco/avatar.png',
      member_contact: new MemberContact(),
      member_spiritual: new MemberSpiritual()
    })

    const members = await listMembers.execute()

    expect(members).toEqual([member1, member2])
  })
})
