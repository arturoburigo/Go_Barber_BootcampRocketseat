import { sign } from 'jsonwebtoken'
import authKey from '@config/authKey'
import { injectable, inject } from 'tsyringe'
import AppError from '@shared/errors/AppError'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

import IUsersRepository from '../repositories/IUsersRepository'
import User from '../infra/typeorm/entities/user'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

@injectable()
class AuthenticateServices {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ password, email }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('incorret Email/Password combination', 401)
    }
    // user.password=senha cripografada
    // password= senha nao criptrofada
    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password
    )

    if (!passwordMatched) {
      throw new AppError('incorret Email/Password combination', 401)
    }
    // usuarui autenticado

    const { key, expiresIn } = authKey.jwt

    const token = sign({}, key, {
      subject: user.id,
      expiresIn,
    })

    return {
      user,
      token,
    }
  }
}

export default AuthenticateServices
