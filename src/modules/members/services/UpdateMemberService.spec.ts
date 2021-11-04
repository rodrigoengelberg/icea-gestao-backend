import AppError from '@shared/errors/AppError'

import FakeMembersRepository from '@modules/members/repositories/fakes/FakeMembersRepository'
import UpdateMemberService from './UpdateMemberService'
import MemberContact from '../infra/typeorm/entities/MemberContact'
import MemberSpiritual from '../infra/typeorm/entities/MemberSpiritual'

let fakeMembersRepository: FakeMembersRepository
let updateMemberService: UpdateMemberService

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeMembersRepository = new FakeMembersRepository()

    updateMemberService = new UpdateMemberService(fakeMembersRepository)
  })

  it('should be able to update a member', async () => {
    const member = await fakeMembersRepository.create({
      first_name: 'John',
      last_name: 'John Doe',
      email: 'johndoe@example.com',
      gender: 'Male',
      marital_status: 'Casado(a)',
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

    await updateMemberService.execute({
      member_id: member.id,
      first_name: 'John',
      last_name: 'John Doe',
      email: 'johndoe_new@example.com',
      gender: 'Male',
      marital_status: 'Solteiro(a)',
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

    expect(member.marital_status).toBe('Solteiro(a)')
    expect(member.email).toBe('johndoe_new@example.com')
  })

  it('should not be able update member from non existing member', async () => {
    await expect(
      updateMemberService.execute({
        member_id: 'non-existing-user',
        first_name: 'John',
        last_name: 'John Doe',
        email: 'johndoe@example.com',
        gender: 'Male',
        marital_status: 'Casado(a)',
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

  it('should not be able update member with existing email', async () => {
    await fakeMembersRepository.create({
      first_name: 'John',
      last_name: 'John Doe',
      email: 'johndoe@example.com',
      gender: 'Male',
      marital_status: 'Casado(a)',
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

    const member = await fakeMembersRepository.create({
      first_name: 'John',
      last_name: 'John Doe',
      email: 'johndoe_new@example.com',
      gender: 'Male',
      marital_status: 'Casado(a)',
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
      updateMemberService.execute({
        member_id: member.id,
        first_name: 'John',
        last_name: 'John Doe',
        email: 'johndoe@example.com',
        gender: 'Male',
        marital_status: 'Casado(a)',
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
