import { uuid } from 'uuidv4'

import ICreatePatrimonyDTO from '@modules/patrimonies/dtos/ICreatePatrimonyDTO'
import IPatrimonyRepository from '@modules/patrimonies/repositories/IPatrimonyRepository'
import Patrimony from '../../infra/typeorm/entities/Patrimony'


class FakePatrimonyRepository implements IPatrimonyRepository {
  private patrimonies: Patrimony[] = []

  public async findAll(): Promise<Patrimony[] | undefined> {
    const findPatrimonies = this.patrimonies

    return findPatrimonies
  }

  public async findById(id: string): Promise<Patrimony | undefined> {
    const findPatrimony = this.patrimonies.find(patrimony => patrimony.id === id)

    return findPatrimony
  }

  public async findByDescription(description: string): Promise<Patrimony | undefined> {
    const findPatrimony = this.patrimonies.find(patrimony => patrimony.description === description)

    return findPatrimony
  }

  public async delete(id: string): Promise<Patrimony | undefined> {

    let response = undefined
    let newArray = [...this.patrimonies]

    const findIndex = newArray.findIndex(patrimony => patrimony.id === id)

    if (findIndex > -1) {
      newArray = newArray.splice(findIndex, 1)
    }

    response = newArray.find(patrimony => patrimony.id === id)

    return response
  }

  public async create(patrimonyData: ICreatePatrimonyDTO): Promise<Patrimony> {
    const patrimony = new Patrimony()

    Object.assign(patrimony, { id: uuid() }, patrimonyData)

    this.patrimonies.push(patrimony)

    return patrimony
  }

  public async save(patrimony: Patrimony): Promise<Patrimony> {
    const findIndex = this.patrimonies.findIndex(patrimony => patrimony.id === patrimony.id)

    this.patrimonies[findIndex] = patrimony

    return patrimony
  }
}

export default FakePatrimonyRepository
