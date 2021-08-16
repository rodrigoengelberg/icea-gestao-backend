import { getRepository, Repository } from 'typeorm'

import ICreatePatrimonyDTO from '@modules/patrimonies/dtos/ICreatePatrimonyDTO'
import IPatrimonyRepository from '@modules/patrimonies/repositories/IPatrimonyRepository'
import Patrimony from '../entities/Patrimony'

class PatrimonyRepository implements IPatrimonyRepository {
  private ormRepository: Repository<Patrimony>

  constructor() {
    this.ormRepository = getRepository(Patrimony)
  }

  public async findAll(): Promise<Patrimony[] | undefined> {
    const findPatrimonies = await this.ormRepository.find()

    return findPatrimonies
  }

  public async findById(id: string): Promise<Patrimony | undefined> {
    const findPatrimony = await this.ormRepository.findOne(id)

    return findPatrimony
  }

  public async findByDescription(description: string): Promise<Patrimony | undefined> {
    const findPatrimony = await this.ormRepository.findOne({
      where: { description },
    })

    return findPatrimony
  }

  public async delete(id: string): Promise<Patrimony | undefined> {
    const findPatrimony = await this.ormRepository.findOne(id)

    return this.ormRepository.remove(findPatrimony)
  }

  public async create(patrimonyData: ICreatePatrimonyDTO): Promise<Patrimony> {
    const patrimony = this.ormRepository.create(patrimonyData)

    await this.ormRepository.save(patrimony)

    return patrimony
  }

  public async save(patrimony: Patrimony): Promise<Patrimony> {
    return this.ormRepository.save(patrimony)
  }
}

export default PatrimonyRepository
