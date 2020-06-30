import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import ListProviderService from './ListProviderService'

let fakeUsersRepository: FakeUserRepository
let listProviderService: ListProviderService

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository()

    listProviderService = new ListProviderService(fakeUsersRepository)
  })
  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    const user2 = await fakeUsersRepository.create({
      name: 'John Tre',
      email: 'johntre@gmail.com',
      password: '123456',
    })

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'johnqua@gmail.com',
      password: '123456',
    })

    const providers = await listProviderService.execute({
      user_id: loggedUser.id,
    })

    expect(providers).toEqual([user1, user2])
  })
})
