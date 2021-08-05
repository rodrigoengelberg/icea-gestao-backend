import AppError from '@shared/errors/AppError'

import FakeMembersRepository from '../repositories/fakes/FakeMembersRepository'
import ShowMembersByIdService from './ShowMembersByIdService'

let fakeMembersRepository: FakeMembersRepository
let showMembers: ShowMembersByIdService

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeMembersRepository = new FakeMembersRepository()

    showMembers = new ShowMembersByIdService(fakeMembersRepository)
  })

  it('should be able to show the member', async () => {
    const member = await fakeMembersRepository.create({
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe@example.com',
      gender: 'Male',
      member_type: 'Ativo',
      marital_status: 'Casado',
      nationality: 'Brasileiro',
      birth_date: new Date()
    })

    const memberCreated = await showMembers.execute({
      member_id: member.id,
    })

    expect(memberCreated.first_name).toBe('John')
    expect(memberCreated.last_name).toBe('Doe')
    expect(memberCreated.email).toBe('johndoe@example.com')
  })

  it('should not be able to show the member from a non-existing', async () => {
    await expect(
      showMembers.execute({
        member_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
