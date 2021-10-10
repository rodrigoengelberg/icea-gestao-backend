import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider'
import Patrimony from '../infra/typeorm/entities/Patrimony'
import IPatrimonyRepository from '../repositories/IPatrimonyRepository'

interface IRequest {
  patrimony_id: string
  description: string
  accounting_classification: string
  localization: string
  observations: string
}

@injectable()
class UpdatePatrimonyService {
  constructor(
    @inject('PatrimonyRepository')
    private patrimonyRepository: IPatrimonyRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({
    patrimony_id,
    description,
    accounting_classification,
    localization,
    observations
  }: IRequest): Promise<Patrimony> {
    const patrimony = await this.patrimonyRepository.findById(patrimony_id)

    if (!patrimony) {
      throw new AppError('Patrimony not found')
    }

    const checkPatrimonyExists = await this.patrimonyRepository.findByDescription(
      description
    )

    if (checkPatrimonyExists && checkPatrimonyExists.id !== patrimony_id) {
      throw new AppError('Patrimony description already used.')
    }

    Object.assign(
      patrimony,
      { id: patrimony_id },
      {
        description,
        accounting_classification,
        localization,
        observations
      }
    )

    await this.patrimonyRepository.save(patrimony)

    await this.cacheProvider.invalidatePrefix('patrimonies-list')

    return patrimony
  }
}

export default UpdatePatrimonyService
