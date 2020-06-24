import AppError from '@shared/errors/AppError'
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository'
import FakeUsersTokensRepository from '../repositories/fakes/FakeUsersTokensRepository'
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService'

let fakeUsersRepository: FakeUsersRepository
let fakeUsersTokenRepository: FakeUsersTokensRepository
let fakeMailProvider: FakeMailProvider
let sendForgotPasswordEmail: SendForgotPasswordEmailService

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeMailProvider = new FakeMailProvider()
    fakeUsersTokenRepository = new FakeUsersTokensRepository()

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUsersTokenRepository
    )
  })

  it('should be able to recover the user password', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@gmail.com',
    })

    expect(sendMail).toHaveBeenCalled()
  })

  it('should not be able to recover a non-existing user password ', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'johndoe@gmail.com',
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUsersTokenRepository, 'generate')

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@gmail.com',
    })

    expect(generateToken).toHaveBeenCalledWith(user.id)
  })
})
