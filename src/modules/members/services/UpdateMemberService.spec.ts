import AppError from '@shared/errors/AppError'

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeMembersRepository from '@modules/members/repositories/fakes/FakeMembersRepository'
import UpdateMemberService from './UpdateMemberService'
import MemberContact from '../infra/typeorm/entities/MemberContact'
import MemberDetails from '../infra/typeorm/entities/MemberDetails'
import MemberSpirutal from '../infra/typeorm/entities/MemberSpiritual'

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
      full_name: 'John Doe',
      email: 'johndoe@example.com',
      gender: 'Male',
      marital_status: 'Casado(a)',
      nationality: 'Brasileiro',
      birth_date: new Date(),
      member_contact: new MemberContact(),
      member_details: new MemberDetails(),
      member_spiritual: new MemberSpirutal()
    })

    await updateMemberService.execute({
      member_id: member.id,
      first_name: 'John',
      full_name: 'John Doe',
      email: 'johndoe_new@example.com',
      gender: 'Male',
      marital_status: 'Solteiro(a)',
      nationality: 'Brasileiro',
      birth_date: new Date(),
      member_contact: new MemberContact(),
      member_details: new MemberDetails(),
      member_spiritual: new MemberSpirutal()
    })

    expect(member.marital_status).toBe('Solteiro(a)')
    expect(member.email).toBe('johndoe_new@example.com')
  })

  it('should not be able update member from non existing member', async () => {
    await expect(
      updateMemberService.execute({
        member_id: 'non-existing-user',
        first_name: 'John',
        full_name: 'John Doe',
        email: 'johndoe@example.com',
        gender: 'Male',
        marital_status: 'Casado(a)',
        nationality: 'Brasileiro',
        birth_date: new Date(),
        member_contact: new MemberContact(),
        member_details: new MemberDetails(),
        member_spiritual: new MemberSpirutal()
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able update member with existing email', async () => {

    await fakeMembersRepository.create({
      first_name: 'John',
      full_name: 'John Doe',
      email: 'johndoe@example.com',
      gender: 'Male',
      marital_status: 'Casado(a)',
      nationality: 'Brasileiro',
      birth_date: new Date(),
      member_contact: new MemberContact(),
      member_details: new MemberDetails(),
      member_spiritual: new MemberSpirutal()
    })

    const member = await fakeMembersRepository.create({
      first_name: 'John',
      full_name: 'John Doe',
      email: 'johndoe_new@example.com',
      gender: 'Male',
      marital_status: 'Casado(a)',
      nationality: 'Brasileiro',
      birth_date: new Date(),
      member_contact: new MemberContact(),
      member_details: new MemberDetails(),
      member_spiritual: new MemberSpirutal()
    })

    await expect(
      updateMemberService.execute({
        member_id: member.id,
        first_name: 'John',
        full_name: 'John Doe',
        email: 'johndoe@example.com',
        gender: 'Male',
        marital_status: 'Casado(a)',
        nationality: 'Brasileiro',
        birth_date: new Date(),
        member_contact: new MemberContact(),
        member_details: new MemberDetails(),
        member_spiritual: new MemberSpirutal()
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

})
