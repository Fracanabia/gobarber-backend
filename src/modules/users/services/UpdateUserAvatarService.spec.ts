import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'
import AppError from '@shared/errors/AppError'

describe('UpdateUserAvatar', () => {
  it('should be able to update avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository()

    const fakeStorageProvider = new FakeStorageProvider()
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    )

    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '12345',
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'file.jpg',
    })

    expect(user.avatar).toBe('file.jpg')
  })

  it('should be able to update avatar from non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()

    const fakeStorageProvider = new FakeStorageProvider()
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    )

    expect(
      updateUserAvatar.execute({
        user_id: 'no-exists',
        avatarFilename: 'file.jpg',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeStorageProvider = new FakeStorageProvider()

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    )
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '12345',
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'file.jpg',
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'file-new.jpg',
    })

    expect(deleteFile).toHaveBeenCalledWith('file.jpg')
    expect(user.avatar).toBe('file-new.jpg')
  })
})
