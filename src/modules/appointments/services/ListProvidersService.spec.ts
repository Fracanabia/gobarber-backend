import ListProvidersService from '@modules/appointments/services/ListProvidersService'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'

let fakeUsersRepository: FakeUsersRepository
let listProvidersService: ListProvidersService

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    listProvidersService = new ListProvidersService(fakeUsersRepository)
  })
  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'teste1',
      email: 'teste1@teste.com',
      password: '12345',
    })

    const user2 = await fakeUsersRepository.create({
      name: 'teste2',
      email: 'teste2@teste.com',
      password: '12345',
    })

    const user3 = await fakeUsersRepository.create({
      name: 'teste3',
      email: 'teste3@teste.com',
      password: '12345',
    })

    const loggedUser = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '12345',
    })

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    })
    expect(providers).toEqual([user1, user2, user3])
  })
})
