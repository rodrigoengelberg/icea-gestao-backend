import { inject, injectable } from 'tsyringe'
import AppError from '@shared/errors/AppError'

import Patrimony from '../infra/typeorm/entities/Patrimony'
import IPatrimonyRepository from '../repositories/IPatrimonyRepository'

interface IRequest {
  patrimony_id: string
}

@injectable()
class ShowMembersByIdService {
  constructor(
    @inject('PatrimonyRepository')
    private patrimonyRepository: IPatrimonyRepository,
  ) { }

  public async execute({ patrimony_id }: IRequest): Promise<Patrimony> {
    const patrimony = await this.patrimonyRepository.findById(patrimony_id)

    if (!patrimony) {
      throw new AppError('Patrimony not found')
    }

    return patrimony
  }
}

export default ShowMembersByIdService
