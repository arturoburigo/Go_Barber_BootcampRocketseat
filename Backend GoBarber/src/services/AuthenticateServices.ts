import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import User from '../models/user'
import { sign } from 'jsonwebtoken'
import authKey from '../config/authKey'
import AppError from '../error/AppError'

interface Request {
  email: string
  password: string
}

interface Response {
  user: User
  token: string
}

class AuthenticateServices {
  public async execute({ password, email }: Request): Promise<Response> {
    const userRepository = getRepository(User)

    const user = await userRepository.findOne({
      where: { email },
    })

    if (!user) {
      throw new AppError('incorret Email/Password combination', 401)
    }
    // user.password=senha cripografada
    // password= senha nao criptrofada
    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('incorret Email/Password combination', 401)
    }
    // usuarui autenticado

    const { key, expiresIn } = authKey.jwt

    const token = sign({}, key, {
      subject: user.id,
      expiresIn: expiresIn,
    })

    return {
      user,
      token,
    }
  }
}

export default AuthenticateServices
