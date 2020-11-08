import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import ShowProfileService from '@modules/users/services/ShowProfileService'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let showProfileService: ShowProfileService

describe('UpdateUserProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    showProfileService = new ShowProfileService(fakeUsersRepository)
  })
  it('should be able show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@teste.com',
      password: '12345',
    })

    const profile = await showProfileService.execute({
      user_id: user.id,
    })

    expect(profile.name).toBe('teste')
    expect(profile.email).toBe('teste@teste.com')
  })

  it('should not be able show profile from non-existing user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'non-existing user',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
