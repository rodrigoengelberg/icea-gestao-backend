import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import AppError from '@shared/errors/AppError'
import FakeMembersRepository from '../repositories/fakes/FakeMembersRepository'
import CreateMemberContactService from './CreateMemberContactService'
import DeleteMemberContactService from './DeleteMemberContactService'

let fakeMembersRepository: FakeMembersRepository
let fakeCacheProvider: FakeCacheProvider
let createMemberContact: CreateMemberContactService
let deleteMemberContact: DeleteMemberContactService

describe('DeleteMemberContact', () => {
  beforeEach(() => {
    fakeMembersRepository = new FakeMembersRepository()
    fakeCacheProvider = new FakeCacheProvider()

    createMemberContact = new createMemberContact(
      fakeMembersRepository,
      fakeCacheProvider
    )

    deleteMemberContact = new deleteMemberContact(
      fakeMembersRepository,
      fakeCacheProvider
    )
  })

  it('should be able to delete a member', async () => {
    const memberContact = await createMemberContact.execute({
      member_id: 'uuid',
      address: 'Street John',
      state: 'Doe',
      city: 'Johnápolis',
      zipcode: 75999999,
      phone_type: 1,
      phone_type_name: 'Celular',
      phone_number: 6199999999
    })

    const memberContactDeleted = await deleteMemberContact.execute({
      member_contact_id: memberContact.id
    })

    expect(memberContactDeleted.message).toBeDefined()
  })

  it('should NOT be able to delete a member', async () => {
    await createMemberContact.execute({
      member_id: 'uuid',
      address: 'Street John',
      state: 'Doe',
      city: 'Johnápolis',
      zipcode: 75999999,
      phone_type: 1,
      phone_type_name: 'Celular',
      phone_number: 6199999999
    })

    await createMemberContact.execute({
      member_id: 'uuid',
      address: 'Street John',
      state: 'Doe',
      city: 'Johnápolis',
      zipcode: 75999999,
      phone_type: 1,
      phone_type_name: 'Celular',
      phone_number: 6199999999
    })

    await expect(
      deleteMemberContact.execute({
        member_contact_id: 'not exist'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
