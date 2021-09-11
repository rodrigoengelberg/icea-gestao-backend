import AppError from '@shared/errors/AppError'

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeMembersRepository from '../repositories/fakes/FakeMembersRepository'
import CreateMemberService from './CreateMemberService'
import MemberContact from '../infra/typeorm/entities/MemberContact'
import MemberSpiritual from '../infra/typeorm/entities/MemberSpiritual'

let fakeMembersRepository: FakeMembersRepository
let fakeCacheProvider: FakeCacheProvider
let createMember: CreateMemberService

describe('CreateMember', () => {
  beforeEach(() => {
    fakeMembersRepository = new FakeMembersRepository()
    fakeCacheProvider = new FakeCacheProvider()

    createMember = new CreateMemberService(
      fakeMembersRepository,
      fakeCacheProvider
    )
  })

  it('should be able to create a new member', async () => {
    const member = await createMember.execute({
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

    expect(member).toHaveProperty('id')
  })

  it('should not be able to create a new member with email from another', async () => {
    await createMember.execute({
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

    await expect(
      createMember.execute({
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
    ).rejects.toBeInstanceOf(AppError)
  })
})
