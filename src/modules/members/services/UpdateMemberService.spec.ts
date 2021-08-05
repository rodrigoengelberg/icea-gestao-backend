import AppError from '@shared/errors/AppError'

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeMembersRepository from '@modules/members/repositories/fakes/FakeMembersRepository'
import UpdateMemberService from './UpdateMemberService'

let fakeMembersRepository: FakeMembersRepository
let fakeCacheProvider: FakeCacheProvider
let updateMemberService: UpdateMemberService

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeMembersRepository = new FakeMembersRepository()
    fakeCacheProvider = new FakeCacheProvider()

    updateMemberService = new UpdateMemberService(
      fakeMembersRepository,
      fakeCacheProvider,
    )
  })

  it('should be able to create a new member', async () => {
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

    await updateMemberService.execute({
      member_id: member.id,
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe_new@example.com',
      gender: 'Male',
      member_type: 'Inativo',
      marital_status: 'Casado',
      nationality: 'Brasileiro',
      birth_date: new Date()
    })

    expect(member.member_type).toBe('Inativo')
    expect(member.email).toBe('johndoe_new@example.com')
  })

  it('should not be able update member from non existing member', async () => {
    await expect(
      updateMemberService.execute({
        member_id: 'non-existing-user',
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@example.com',
        gender: 'Male',
        member_type: 'Inativo',
        marital_status: 'Casado',
        nationality: 'Brasileiro',
        birth_date: new Date()
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able update member with existing email', async () => {

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

    const member = await fakeMembersRepository.create({
      first_name: 'John',
      last_name: 'Doe',
      email: 'johndoe_new@example.com',
      gender: 'Male',
      member_type: 'Ativo',
      marital_status: 'Casado',
      nationality: 'Brasileiro',
      birth_date: new Date()
    })

    await expect(
      updateMemberService.execute({
        member_id: member.id,
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@example.com',
        gender: 'Male',
        member_type: 'Inativo',
        marital_status: 'Casado',
        nationality: 'Brasileiro',
        birth_date: new Date()
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

})
