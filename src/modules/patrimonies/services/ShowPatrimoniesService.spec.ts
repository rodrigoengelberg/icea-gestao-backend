import FakePatrimonyRepository from '../repositories/fakes/FakePatrimonyRepository'
import ShowPatrimoniesService from './ShowPatrimoniesService'

let fakePatrimonyRepository: FakePatrimonyRepository
let showPatrimonies: ShowPatrimoniesService

describe('ShowPatrimonies', () => {
  beforeEach(() => {
    fakePatrimonyRepository = new FakePatrimonyRepository()

    showPatrimonies = new ShowPatrimoniesService(fakePatrimonyRepository)
  })

  it('should be able to show the members', async () => {
    await fakePatrimonyRepository.create({
      description: 'Computador',
      accounting_classification: 'Eletrônicos',
      localization: 'Escritório',
      observations: 'Computador utilizado pelo pastor'
    })

    await fakePatrimonyRepository.create({
      description: 'Mesa de Som',
      accounting_classification: 'Áudio e vídeo',
      localization: 'Templo',
      observations: 'Mesa para templo e tranmissão'
    })

    const patrimonies = await showPatrimonies.execute()

    expect(patrimonies.length).toBeGreaterThan(0)
    expect(patrimonies[0].description).toBe('Computador')
    expect(patrimonies[0].accounting_classification).toBe(1)
    expect(patrimonies[0].localization).toBe('Escritório')
  })
})
