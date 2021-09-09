import AppError from '@shared/errors/AppError'

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeMembersContactRepository from '@modules/members/repositories/fakes/FakeMembersContactRepository'
import UpdateMemberContactService from './UpdateMemberContactService'

let fakeMembersContactRepository: FakeMembersContactRepository
let fakeCacheProvider: FakeCacheProvider
let updateMemberContactService: UpdateMemberContactService

describe('UpdateMemberContact', () => {
  beforeEach(() => {
    fakeMembersContactRepository = new FakeMembersContactRepository()
    fakeCacheProvider = new FakeCacheProvider()

    updateMemberContactService = new UpdateMemberContactService(
      fakeMembersContactRepository,
      fakeCacheProvider
    )
  })

  it('should be able to update a member contact', async () => {
    const memberContact = await fakeMembersContactRepository.create({
      member_id: 'uuid',
      address: 'Street John',
      state: 'Doe',
      city: 'Johnápolis',
      zipcode: 75999999,
      phone_type: 1,
      phone_type_name: 'Celular',
      phone_number: 6199999999
    })

    await updateMemberContactService.execute({
      member_contact_id: memberContact.id,
      member_id: 'uuid',
      address: 'Street John',
      state: 'Doe',
      city: 'Johnápolis',
      zipcode: 75999999,
      phone_type: 2,
      phone_type_name: 'Fixo',
      phone_number: 6133333333
    })

    expect(memberContact.phone_type).toBe(2)
    expect(memberContact.phone_type_name).toBe('Fixo')
    expect(memberContact.phone_number).toBe(6133333333)
  })

  it('should not be able update member from non existing member', async () => {
    await expect(
      updateMemberContactService.execute({
        member_contact_id: 'non-existing-user',
        member_id: 'uuid',
        address: 'Street John',
        state: 'Doe',
        city: 'Johnápolis',
        zipcode: 75999999,
        phone_type: 2,
        phone_type_name: 'Fixo',
        phone_number: 6133333333
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
