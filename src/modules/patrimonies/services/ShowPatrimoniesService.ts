import { injectable, inject } from 'tsyringe'

import Patrimony from '../infra/typeorm/entities/Patrimony'
import IPatrimonyRepository from '../repositories/IPatrimonyRepository'

@injectable()
class ShowPatrimoniesService {
  constructor(
    @inject('PatrimonyRepository')
    private patrimonyRepository: IPatrimonyRepository
  ) { }

  public async execute(): Promise<Patrimony[]> {

    const patrimonies = await this.patrimonyRepository.findAll()

    return patrimonies
  }
}

export default ShowPatrimoniesService
