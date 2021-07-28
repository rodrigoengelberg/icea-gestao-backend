import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeMembersDetailsRepository from '../repositories/fakes/FakeMembersDetailsRepository'
import CreateMemberDetailsService from './CreateMemberDetailsService'

let fakeMembersDetailsRepository: FakeMembersDetailsRepository
let fakeCacheProvider: FakeCacheProvider
let createMemberDetails: CreateMemberDetailsService

describe('CreateMember', () => {
  beforeEach(() => {
    fakeMembersDetailsRepository = new FakeMembersDetailsRepository()
    fakeCacheProvider = new FakeCacheProvider()

    createMemberDetails = new CreateMemberDetailsService(
      fakeMembersDetailsRepository,
      fakeCacheProvider,
    )
  })

  it('should be able to create a new member', async () => {
    const memberDetails = await createMemberDetails.execute({
      avatar: '/endereco/avatar.png',
      occupation: 'Autônomo',
      schooling: 'Superior',
      facebook_link: 'facebook.com/johndole',
      instagram_link: 'instagram.com/johndole'
    })

    expect(memberDetails).toHaveProperty('id')
  })

})
