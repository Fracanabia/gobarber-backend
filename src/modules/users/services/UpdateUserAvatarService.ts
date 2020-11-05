import path from 'path'
import fs from 'fs'
import User from '@modules/users/infra/typeorm/entities/User'
import uploadConfig from '@config/upload'
import AppError from '@shared/errors/AppError'
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository'
import { injectable, inject } from 'tsyringe'

interface IRequest {
  user_id: string
  AvatarFilename: string
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id, AvatarFilename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401)
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    user.avatar = AvatarFilename

    await this.usersRepository.save(user)

    return user
  }
}

export default UpdateUserAvatarService
