import FakeMembersRepository from '../repositories/fakes/FakeMembersRepository'
import ShowMembersService from './ShowMembersService'
import MemberContact from '../infra/typeorm/entities/MemberContact'
import MemberSpiritual from '../infra/typeorm/entities/MemberSpiritual'

let fakeMembersRepository: FakeMembersRepository
let showMembers: ShowMembersService

describe('ShowMembers', () => {
  beforeEach(() => {
    fakeMembersRepository = new FakeMembersRepository()

    showMembers = new ShowMembersService(fakeMembersRepository)
  })

  it('should be able to show the members', async () => {
    await fakeMembersRepository.create({
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

    await fakeMembersRepository.create({
      first_name: 'Peter',
      last_name: 'Peter Doe',
      email: 'johndoe_new@example.com',
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

    const members = await showMembers.execute()

    expect(members.length).toBeGreaterThan(0)
    expect(members[0].first_name).toBe('John')
    expect(members[0].last_name).toBe('John Doe')
    expect(members[0].email).toBe('johndoe@example.com')
  })
})
