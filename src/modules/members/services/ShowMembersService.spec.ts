import FakeMembersRepository from '../repositories/fakes/FakeMembersRepository'
import FakeMembersContactRepository from '../repositories/fakes/FakeMembersContactRepository'
import ShowMembersService from './ShowMembersService'
import MemberContact from '../infra/typeorm/entities/MemberContact'

let fakeMembersRepository: FakeMembersRepository
let fakeMembersContactRepository: FakeMembersContactRepository
let showMembers: ShowMembersService

describe('ShowMembers', () => {
  beforeEach(() => {
    fakeMembersRepository = new FakeMembersRepository()
    fakeMembersRepository = new FakeMembersRepository()

    showMembers = new ShowMembersService(fakeMembersRepository, fakeMembersContactRepository)
  })

  it('should be able to show the members', async () => {
    await fakeMembersRepository.create({
      first_name: 'John',
      full_name: 'John Doe',
      email: 'johndoe@example.com',
      gender: 'Male',
      marital_status: 'Casado',
      nationality: 'Brasileiro',
      birth_date: new Date(),
      member_contact: new MemberContact()
    })

    await fakeMembersRepository.create({
      first_name: 'Peter',
      full_name: 'Peter Doe',
      email: 'johndoe_new@example.com',
      gender: 'Male',
      marital_status: 'Solteiro',
      nationality: 'Brasileiro',
      birth_date: new Date(),
      member_contact: new MemberContact()
    })

    const members = await showMembers.execute()

    expect(members.length).toBeGreaterThan(0)
    expect(members[0].first_name).toBe('John')
    expect(members[0].full_name).toBe('John Doe')
    expect(members[0].email).toBe('johndoe@example.com')
  })

})
