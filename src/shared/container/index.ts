import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository'
import '@modules/users/providers'
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository'
import '@shared/container/providers'
import { container } from 'tsyringe'

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository
)

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
)
