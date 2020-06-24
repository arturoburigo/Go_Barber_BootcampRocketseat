import AppError from '@shared/errors/AppError'

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository'
import UpdateAvatarUserServices from './UpdateAvatarUserServices'

let fakeUsersRepository: FakeUserRepository
let fakeStorageProvider: FakeStorageProvider
let updateUserAvatar: UpdateAvatarUserServices

describe('UpdateAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository()
    fakeStorageProvider = new FakeStorageProvider()

    updateUserAvatar = new UpdateAvatarUserServices(
      fakeUsersRepository,
      fakeStorageProvider
    )
  })
  it('should be able to update avatar image', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    })

    expect(user.avatar).toBe('avatar.jpg')
  })

  it('should not be able to update avatar image with anonnymouss user ', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'nothing',
        avatarFilename: 'avatar.jpg',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to update avatarold to new own', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg',
    })

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg')
    expect(user.avatar).toBe('avatar2.jpg')
  })
})
