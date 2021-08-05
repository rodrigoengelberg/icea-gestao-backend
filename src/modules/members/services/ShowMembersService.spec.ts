import AppError from '@shared/errors/AppError'

import FakeMembersRepository from '../repositories/fakes/FakeMembersRepository'
import ShowMembersService from './ShowMembersService'

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
      last_name: 'Doe',
      email: 'johndoe@example.com',
      gender: 'Male',
      member_type: 'Ativo',
      marital_status: 'Casado',
      nationality: 'Brasileiro',
      birth_date: new Date()
    })

    await fakeMembersRepository.create({
      first_name: 'Peter',
      last_name: 'Doe',
      email: 'johndoe_new@example.com',
      gender: 'Male',
      member_type: 'Ativo',
      marital_status: 'Solteiro',
      nationality: 'Brasileiro',
      birth_date: new Date()
    })

    const members = await showMembers.execute()

    expect(members.length).toBeGreaterThan(0)
    expect(members[0].first_name).toBe('John')
    expect(members[0].last_name).toBe('Doe')
    expect(members[0].email).toBe('johndoe@example.com')
  })

})
