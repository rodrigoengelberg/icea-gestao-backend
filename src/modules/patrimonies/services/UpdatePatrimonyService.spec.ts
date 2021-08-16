import AppError from '@shared/errors/AppError'

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider'
import FakePatrimonyRepository from '@modules/patrimonies/repositories/fakes/FakePatrimonyRepository'
import UpdatePatrimonyService from './UpdatePatrimonyService'

let fakePatrimonyRepository: FakePatrimonyRepository
let fakeCacheProvider: FakeCacheProvider
let updatePatrimony: UpdatePatrimonyService

describe('UpdatePatrimonyService', () => {
  beforeEach(() => {
    fakePatrimonyRepository = new FakePatrimonyRepository()
    fakeCacheProvider = new FakeCacheProvider()

    updatePatrimony = new UpdatePatrimonyService(
      fakePatrimonyRepository,
      fakeCacheProvider,
    )
  })

  it('should be able to create a new patrimony', async () => {
    const patrimony = await fakePatrimonyRepository.create({
      description: 'Computador',
      accounting_classification: 1,
      accounting_classification_name: 'Eletrônicos',
      localization: 'Escritório',
      observations: 'Computador utilizado pelo pastor'
    })

    await updatePatrimony.execute({
      patrimony_id: patrimony.id,
      description: 'Computador',
      accounting_classification: 1,
      accounting_classification_name: 'Eletrônicos',
      localization: 'Templo',
      observations: 'Computador utilizado para transmissão'
    })

    expect(patrimony.localization).toBe('Templo')
    expect(patrimony.observations).toBe('Computador utilizado para transmissão')
  })

  it('should not be able update patrimony from non existing patrimony', async () => {
    await expect(
      updatePatrimony.execute({
        patrimony_id: 'non-existing-user',
        description: 'Computador',
        accounting_classification: 1,
        accounting_classification_name: 'Eletrônicos',
        localization: 'Templo',
        observations: 'Computador utilizado para transmissão'
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able update a patrimony with existing descriptions', async () => {

    await fakePatrimonyRepository.create({
      description: 'Computador',
      accounting_classification: 1,
      accounting_classification_name: 'Eletrônicos',
      localization: 'Escritório',
      observations: 'Computador utilizado pelo pastor'
    })

    const patrimony = await fakePatrimonyRepository.create({
      description: 'Mesa de Som',
      accounting_classification: 1,
      accounting_classification_name: 'Áudio e vídeo',
      localization: 'Templo',
      observations: 'Computador utilizado para transmissão'
    })

    await expect(
      updatePatrimony.execute({
        patrimony_id: patrimony.id,
        description: 'Computador',
        accounting_classification: 1,
        accounting_classification_name: 'Eletrônicos',
        localization: 'Templo',
        observations: 'Computador utilizado para transmissão'
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

})
