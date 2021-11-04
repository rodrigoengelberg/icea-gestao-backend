import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import IPatrimonyRepository from '../repositories/IPatrimonyRepository'

interface IRequest {
  patrimony_id: string
}

@injectable()
class DeletePatrimonyService {
  constructor(
    @inject('PatrimonyRepository')
    private patrimonyRepository: IPatrimonyRepository
  ) {}

  public async execute({ patrimony_id }: IRequest): Promise<any> {
    const patrimony = await this.patrimonyRepository.findById(patrimony_id)

    if (!patrimony) {
      throw new AppError('Something wrong to delete this member')
    }

    await this.patrimonyRepository.delete(patrimony_id)

    return { message: 'Patrimony deleted succesfull' }
  }
}

export default DeletePatrimonyService
