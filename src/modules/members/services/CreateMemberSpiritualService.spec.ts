import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakeMembersSpiritualRepository from '../repositories/fakes/FakeMembersSpiritualRepository'
import CreateMemberSpiritualService from './CreateMemberSpiritualService'

let fakeMembersSpiritualRepository: FakeMembersSpiritualRepository
let fakeCacheProvider: FakeCacheProvider
let createMemberSpiritual: CreateMemberSpiritualService

describe('CreateMemberSpiritual', () => {
  beforeEach(() => {
    fakeMembersSpiritualRepository = new FakeMembersSpiritualRepository()
    fakeCacheProvider = new FakeCacheProvider()

    createMemberSpiritual = new CreateMemberSpiritualService(
      fakeMembersSpiritualRepository,
      fakeCacheProvider,
    )
  })

  it('should be able to create a new memberSpiritual', async () => {
    const memberSpiritual = await createMemberSpiritual.execute({
      member_id: 'uuid',
      member_function: 'Congregado',
      member_status: 'Ativo',
      baptism_date: new Date(),
      joined_date: new Date(),
      tithe_member: 1,
      problems: 'Nenhum',
      testimony: ''
    })

    expect(memberSpiritual).toHaveProperty('id')
  })

})
