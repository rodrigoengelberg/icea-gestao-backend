import AppError from '@shared/errors/AppError'

import FakePatrimonyRepository from '../repositories/fakes/FakePatrimonyRepository'
import ShowPatrimonyByIdService from './ShowPatrimonyByIdService'

let fakePatrimonyRepository: FakePatrimonyRepository
let showPatrimonies: ShowPatrimonyByIdService

describe('ShowPatrimonyById', () => {
  beforeEach(() => {
    fakePatrimonyRepository = new FakePatrimonyRepository()

    showPatrimonies = new ShowPatrimonyByIdService(fakePatrimonyRepository)
  })

  it('should be able to show the member', async () => {
    const patrimony = await fakePatrimonyRepository.create({
      description: 'Computador',
      accounting_classification: 'Eletrônicos',
      localization: 'Escritório',
      observations: 'Computador utilizado pelo pastor'
    })

    const patrimonyCreated = await showPatrimonies.execute({
      patrimony_id: patrimony.id
    })

    expect(patrimonyCreated.description).toBe('Computador')
    expect(patrimonyCreated.accounting_classification).toBe(1)
    expect(patrimonyCreated.localization).toBe('Escritório')
  })

  it('should not be able to show the patrimony from a non-existing', async () => {
    await expect(
      showPatrimonies.execute({
        patrimony_id: 'non-existing-user-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
