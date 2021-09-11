import { container } from 'tsyringe'

import '@modules/users/providers'
import './providers'

import IMembersRepository from '@modules/members/repositories/IMembersRepository'
import MembersRepository from '@modules/members/infra/typeorm/repositories/MembersRepository'

import IMembersContactRepository from '@modules/members/repositories/IMembersContactRepository'
import MembersContactRepository from '@modules/members/infra/typeorm/repositories/MembersContactRepository'

import IPatrimonyRepository from '@modules/patrimonies/repositories/IPatrimonyRepository'
import PatrimonyRepository from '@modules/patrimonies/infra/typeorm/repositories/PatrimonyRepository'

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository'

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository'

container.registerSingleton<IMembersRepository>(
  'MembersRepository',
  MembersRepository
)

container.registerSingleton<IMembersContactRepository>(
  'MembersContactRepository',
  MembersContactRepository
)

container.registerSingleton<IPatrimonyRepository>(
  'PatrimonyRepository',
  PatrimonyRepository
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
)

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository
)
