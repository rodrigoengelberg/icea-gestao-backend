import AppError from '@shared/errors/AppError'

import FakePatrimonyRepository from '@modules/patrimonies/repositories/fakes/FakePatrimonyRepository'
import UpdatePatrimonyService from './UpdatePatrimonyService'

let fakePatrimonyRepository: FakePatrimonyRepository
let updatePatrimony: UpdatePatrimonyService

describe('UpdatePatrimonyService', () => {
  beforeEach(() => {
    fakePatrimonyRepository = new FakePatrimonyRepository()

    updatePatrimony = new UpdatePatrimonyService(fakePatrimonyRepository)
  })

  it('should be able to create a new patrimony', async () => {
    const patrimony = await fakePatrimonyRepository.create({
      description: 'Computador',
      accounting_classification: 'Eletrônicos',
      localization: 'Escritório',
      observations: 'Computador utilizado pelo pastor'
    })

    await updatePatrimony.execute({
      patrimony_id: patrimony.id,
      description: 'Computador',
      accounting_classification: 'Eletrônicos',
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
        accounting_classification: 'Eletrônicos',
        localization: 'Templo',
        observations: 'Computador utilizado para transmissão'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able update a patrimony with existing descriptions', async () => {
    await fakePatrimonyRepository.create({
      description: 'Computador',
      accounting_classification: 'Eletrônicos',
      localization: 'Escritório',
      observations: 'Computador utilizado pelo pastor'
    })

    const patrimony = await fakePatrimonyRepository.create({
      description: 'Mesa de Som',
      accounting_classification: 'Áudio e vídeo',
      localization: 'Templo',
      observations: 'Computador utilizado para transmissão'
    })

    await expect(
      updatePatrimony.execute({
        patrimony_id: patrimony.id,
        description: 'Computador',
        accounting_classification: 'Eletrônicos',
        localization: 'Templo',
        observations: 'Computador utilizado para transmissão'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
