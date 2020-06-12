import AppError from '@shared/errors/AppError'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository'
import CreateUserServices from './CreateUserServices'

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUserRepository()
    const fakeHashProvider = new FakeHashProvider()
    const createUser = new CreateUserServices(
      fakeUsersRepository,
      fakeHashProvider
    )

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    expect(user).toHaveProperty('id')
  })

  it('should not be able to create a new user with the same email from another', async () => {
    const fakeUsersRepository = new FakeUserRepository()
    const fakeHashProvider = new FakeHashProvider()
    const createUser = new CreateUserServices(
      fakeUsersRepository,
      fakeHashProvider
    )

    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
