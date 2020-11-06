import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import CreateUserService from '@modules/users/services/CreateUserService'
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'
import AppError from '@shared/errors/AppError'

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    await createUser.execute({
      name: 'teste',
      email: 'teste@teste.com',
      password: '12345',
    })

    const response = await authenticateUser.execute({
      email: 'teste@teste.com',
      password: '12345',
    })

    expect(response).toHaveProperty('token')
  })

  it('should not be able to authenticate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    expect(
      authenticateUser.execute({
        email: 'teste@teste.com',
        password: '12345',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeHashProvider = new FakeHashProvider()

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    await createUser.execute({
      name: 'teste',
      email: 'teste@teste.com',
      password: '12345',
    })

    expect(
      authenticateUser.execute({
        email: 'teste@teste.com',
        password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})