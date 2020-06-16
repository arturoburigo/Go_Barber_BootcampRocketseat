import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'

import FakeUsersTokensRepository from '../repositories/fakes/FakeUsersTokensRepository'

import ResetPasswordService from './ResetPasswordService'

let fakeUsersRepository: FakeUsersRepository
let fakeUsersTokenRepository: FakeUsersTokensRepository
let resetPassword: ResetPasswordService

describe(' ', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeUsersTokenRepository = new FakeUsersTokensRepository()

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUsersTokenRepository
    )
  })

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    const { token } = await fakeUsersTokenRepository.generate(user.id)

    await resetPassword.execute({
      password: '123123',
      token,
    })

    const updateUser = await fakeUsersRepository.findById(user.id)

    expect(updateUser?.password).toBe('123123')
  })
})
