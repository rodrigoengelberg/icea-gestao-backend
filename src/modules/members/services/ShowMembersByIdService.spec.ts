import AppError from '@shared/errors/AppError'
import FakeMembersRepository from '../repositories/fakes/FakeMembersRepository'
import ShowMembersByIdService from './ShowMembersByIdService'
import MemberContact from '../infra/typeorm/entities/MemberContact'
import MemberSpiritual from '../infra/typeorm/entities/MemberSpiritual'

let fakeMembersRepository: FakeMembersRepository
let showMembers: ShowMembersByIdService

describe('ShowMemberById', () => {
  beforeEach(() => {
    fakeMembersRepository = new FakeMembersRepository()

    showMembers = new ShowMembersByIdService(fakeMembersRepository)
  })

  it('should be able to show the member', async () => {
    const member = await fakeMembersRepository.create({
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

    const memberCreated = await showMembers.execute({
      member_id: member.id
    })

    expect(memberCreated.first_name).toBe('John')
    expect(memberCreated.last_name).toBe('John Doe')
    expect(memberCreated.email).toBe('johndoe@example.com')
  })

  it('should not be able to show the member from a non-existing', async () => {
    await expect(
      showMembers.execute({
        member_id: 'non-existing-user-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
