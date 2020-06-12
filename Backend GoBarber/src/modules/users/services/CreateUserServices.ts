import { injectable, inject } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import User from '../infra/typeorm/entities/user'
import IUsersRepository from '../repositories/IUsersRepository'

interface IRequest {
  name: string
  email: string
  password: string
}

@injectable()
class CreateUserServices {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const CheckUsersExist = await this.usersRepository.findByEmail(email)

    if (CheckUsersExist) {
      throw new AppError('this email exist')
    }

    const HashedPassword = await this.hashProvider.generateHash(password)

    const user = await this.usersRepository.create({
      name,
      email,
      password: HashedPassword,
    })

    return user
  }
}

export default CreateUserServices
