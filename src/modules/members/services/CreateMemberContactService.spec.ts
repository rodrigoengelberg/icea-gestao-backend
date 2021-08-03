import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeMembersContactRepository from '../repositories/fakes/FakeMembersContactRepository'
import CreateMemberContactService from './CreateMemberContactService'

let fakeMembersContactRepository: FakeMembersContactRepository
let fakeCacheProvider: FakeCacheProvider
let createMemberContact: CreateMemberContactService

describe('CreateMemberContact', () => {
  beforeEach(() => {
    fakeMembersContactRepository = new FakeMembersContactRepository()
    fakeCacheProvider = new FakeCacheProvider()

    createMemberContact = new CreateMemberContactService(
      fakeMembersContactRepository,
      fakeCacheProvider
    )
  })

  it('should be able to create a new member contact', async () => {

    const memberContact = await createMemberContact.execute({
      street: 'John',
      state: 'Doe',
      city: 'johndoe@example.com',
      zipcode: 75999999,
      phoneType: 'Ativo',
      phoneNumber: 6199999999
    })

    expect(memberContact).toHaveProperty('id')
  })

})
