import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import User from '../infra/typeorm/entities/User'
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequest {
  user_id: string
  avatarFilename: string
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Only authenticated user can change avatar', 401)
    }

    await this.usersRepository.save(user)

    return user
  }
}

export default UpdateUserAvatarService
