import AppError from '@shared/errors/AppError'

import FakeUserRepository from '../repositories/fakes/FakeUsersRepository'
import UpdateProfileService from './UpdateProfileService'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'

let fakeUsersRepository: FakeUserRepository
let fakeHashProvider: FakeHashProvider
let updateProfileService: UpdateProfileService

describe('UpdateAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository()
    fakeHashProvider = new FakeHashProvider()

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    )
  })

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })
    const updateUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@gmail.com',
    })

    expect(updateUser.name).toBe('John Trê')
    expect(updateUser.email).toBe('johntre@gmail.com')
  })

  it('should not be able update the profile from non-existing user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-existing-user',
        name: 'test',
        email: 'test@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })
    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'test@gmail.com',
      password: '123456',
    })

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })
    const updateUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Trê',
      email: 'johntre@gmail.com',
      old_password: '123456',
      password: '123123',
    })

    expect(updateUser.password).toBe('123123')
  })
  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'test@gmail.com',
      password: '123456',
    })

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'test@gmail.com',
      password: '123456',
    })

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        old_password: 'wrong-old-password',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
