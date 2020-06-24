import AppError from '@shared/errors/AppError'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository'
import CreateUserServices from './CreateUserServices'

let fakeUsersRepository: FakeUserRepository
let fakeHashProvider: FakeHashProvider
let createUser: CreateUserServices

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository()
    fakeHashProvider = new FakeHashProvider()
    createUser = new CreateUserServices(fakeUsersRepository, fakeHashProvider)
  })
  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    expect(user).toHaveProperty('id')
  })

  it('should not be able to create a new user with the same email from another', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
