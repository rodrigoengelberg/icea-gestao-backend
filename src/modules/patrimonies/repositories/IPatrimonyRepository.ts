import ICreatePatrimonyDTO from '../dtos/ICreatePatrimonyDTO'
import Patrimony from '../infra/typeorm/entities/Patrimony'

export default interface IPatrimonyRepository {
  findAll(): Promise<Patrimony[] | undefined>
  findById(id: string): Promise<Patrimony | undefined>
  findByDescription(description: string): Promise<Patrimony | undefined>
  delete(id: string): Promise<Patrimony | undefined>
  save(patrimony: Patrimony): Promise<Patrimony>
  create(patrimonyData: ICreatePatrimonyDTO): Promise<Patrimony>
}
