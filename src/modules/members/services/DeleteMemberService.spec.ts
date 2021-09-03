import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import AppError from '@shared/errors/AppError'
import FakeMembersRepository from '../repositories/fakes/FakeMembersRepository'
import CreateMemberService from './CreateMemberService'
import DeleteMemberService from './DeleteMemberService'

let fakeMembersRepository: FakeMembersRepository
let fakeCacheProvider: FakeCacheProvider
let createMember: CreateMemberService
let deleteMember: DeleteMemberService

describe('DeleteMember', () => {
  beforeEach(() => {
    fakeMembersRepository = new FakeMembersRepository()
    fakeCacheProvider = new FakeCacheProvider()

    createMember = new CreateMemberService(
      fakeMembersRepository,
      fakeCacheProvider
    )

    deleteMember = new DeleteMemberService(
      fakeMembersRepository,
      fakeCacheProvider
    )
  })

  it('should be able to delete a member', async () => {
    const member = await createMember.execute({
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

    const memberDeleted = await deleteMember.execute({ member_id: member.id })

    expect(memberDeleted.message).toBeDefined()
  })

  it('should NOT be able to delete a member', async () => {
    await createMember.execute({
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

    await createMember.execute({
      first_name: 'John',
      full_name: 'John Tru',
      email: 'johntru@example.com',
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

    await expect(
      deleteMember.execute({
        member_id: 'not exist'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
