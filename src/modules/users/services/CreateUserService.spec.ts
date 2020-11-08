import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider'
import CreateUserService from '@modules/users/services/CreateUserService'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let createUser: CreateUserService

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
  })

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'teste',
      email: 'teste@teste.com',
      password: '12345',
    })

    expect(user).toHaveProperty('id')
  })

  it('should be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'teste',
      email: 'teste@teste.com',
      password: '12345',
    })

    await expect(
      createUser.execute({
        name: 'teste',
        email: 'teste@teste.com',
        password: '12345',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
