import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import UpdateProfileService from '@modules/users/services/UpdateProfileService'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let updateUserProfile: UpdateProfileService

describe('UpdateUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    updateUserProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    )
  })
  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '12345',
    })

    const updateUser = await updateUserProfile.execute({
      user_id: user.id,
      name: 'teste2',
      email: 'teste2@teste.com',
    })

    expect(updateUser.name).toBe('teste2')
    expect(updateUser.email).toBe('teste2@teste.com')
  })
  it('should not be able to change the email to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '12345',
    })

    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste2@teste.com',
      password: '12345',
    })

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'teste2',
        email: 'teste@teste.com',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '12345',
    })

    const updateUser = await updateUserProfile.execute({
      user_id: user.id,
      name: 'teste2',
      email: 'teste2@teste.com',
      old_password: '12345',
      password: '123123',
    })

    expect(updateUser.password).toBe('123123')
  })

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '12345',
    })

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'teste2',
        email: 'teste2@teste.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '12345',
    })

    await expect(
      updateUserProfile.execute({
        user_id: user.id,
        name: 'teste2',
        email: 'teste2@teste.com',
        old_password: 'wrong-old-password',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able update the profile from non-existing user', async () => {
    await expect(
      updateUserProfile.execute({
        user_id: 'another-user',
        name: 'teste2',
        email: 'teste2@teste.com',
        old_password: 'wrong-old-password',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
