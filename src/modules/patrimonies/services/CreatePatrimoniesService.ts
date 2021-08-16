import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import Patrimony from '../infra/typeorm/entities/Patrimony'
import IPatrimonyRepository from '../repositories/IPatrimonyRepository'

interface IRequest {
  description: string
  accounting_classification: number
  accounting_classification_name: string
  localization: string
  observations: string
}

@injectable()
class CreatePatrimoniesService {
  constructor(
    @inject('PatrimonyRepository')
    private patrimonyRepository: IPatrimonyRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute({
    description,
    accounting_classification,
    accounting_classification_name,
    localization,
    observations
  }: IRequest): Promise<Patrimony> {
    const checkPatrimonyExists = await this.patrimonyRepository.findByDescription(description)

    if (checkPatrimonyExists) {
      throw new AppError('Patrimony description already used.')
    }

    const patrimonies = await this.patrimonyRepository.create({
      description,
      accounting_classification,
      accounting_classification_name,
      localization,
      observations
    })

    await this.cacheProvider.invalidatePrefix('patrimonies-list')

    return patrimonies
  }
}

export default CreatePatrimoniesService
