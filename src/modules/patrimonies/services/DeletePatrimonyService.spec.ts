import AppError from '@shared/errors/AppError'

import FakePatrimonyRepository from '../repositories/fakes/FakePatrimonyRepository'
import CreatePatrimoniesService from './CreatePatrimoniesService'
import DeletePatrimonyService from './DeletePatrimonyService'

let fakePatrimonyRepository: FakePatrimonyRepository
let createPatrimony: CreatePatrimoniesService
let deletePatrimony: DeletePatrimonyService

describe('DeletePatrimony', () => {
  beforeEach(() => {
    fakePatrimonyRepository = new FakePatrimonyRepository()

    createPatrimony = new CreatePatrimoniesService(fakePatrimonyRepository)

    deletePatrimony = new DeletePatrimonyService(fakePatrimonyRepository)
  })

  it('should be able to delete a member', async () => {
    const patrimony = await createPatrimony.execute({
      description: 'Computador',
      accounting_classification: 'Eletrônicos',
      localization: 'Escritório',
      observations: 'Computador utilizado pelo pastor'
    })

    const patrimonyDeleted = await deletePatrimony.execute({
      patrimony_id: patrimony.id
    })

    expect(patrimonyDeleted.message).toBeDefined()
  })

  it('should NOT be able to delete a member', async () => {
    await createPatrimony.execute({
      description: 'Computador',
      accounting_classification: 'Eletrônicos',
      localization: 'Escritório',
      observations: 'Computador utilizado pelo pastor'
    })

    await createPatrimony.execute({
      description: 'Mesa de Som',
      accounting_classification: 'Eletrônicos',
      localization: 'Tramissão',
      observations: ''
    })

    await expect(
      deletePatrimony.execute({
        patrimony_id: 'not exist'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
