import AppError from '@shared/errors/AppError'

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakePatrimonyRepository from '../repositories/fakes/FakePatrimonyRepository'
import CreatePatrimoniesService from './CreatePatrimoniesService'

let fakePatrimonyRepository: FakePatrimonyRepository
let fakeCacheProvider: FakeCacheProvider
let createPatrimony: CreatePatrimoniesService

describe('CreatePatrimonies', () => {
  beforeEach(() => {
    fakePatrimonyRepository = new FakePatrimonyRepository()
    fakeCacheProvider = new FakeCacheProvider()

    createPatrimony = new CreatePatrimoniesService(
      fakePatrimonyRepository,
      fakeCacheProvider
    )
  })

  it('should be able to create a new member', async () => {
    const patrimony = await createPatrimony.execute({
      description: 'Computador',
      accounting_classification: 'Eletrônicos',
      localization: 'Escritório',
      observations: 'Computador utilizado pelo pastor'
    })

    expect(patrimony).toHaveProperty('id')
  })

  it('should not be able to create a new patrimony with description from another', async () => {
    await createPatrimony.execute({
      description: 'Mesa de Som',
      accounting_classification: 'Eletrônicos',
      localization: 'Escritório',
      observations: 'Computador utilizado pelo pastor'
    })

    await expect(
      createPatrimony.execute({
        description: 'Mesa de Som',
        accounting_classification: 'Eletrônicos',
        localization: 'Escritório',
        observations: 'Computador utilizado pelo pastor'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
