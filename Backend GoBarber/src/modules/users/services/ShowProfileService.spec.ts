import AppError from '@shared/errors/AppError'

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository'
import ShowProfileService from './ShowProfileService'

let fakeUsersRepository: FakeUserRepository
let showProfile: ShowProfileService

describe('UpdateAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository()

    showProfile = new ShowProfileService(fakeUsersRepository)
  })
  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    const profile = await showProfile.execute({
      user_id: user.id,
    })

    expect(profile.name).toBe('John Doe')
    expect(profile.email).toBe('johndoe@gmail.com')
  })
  it('should not be able show the profile from non-existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existing-user',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
