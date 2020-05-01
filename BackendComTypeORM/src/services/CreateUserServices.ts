import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'
import User from '../models/user'
import AppError from '../error/AppError'

interface Request {
  name: string
  email: string
  password: string
}

class CreateUserServices {
  public async execute({ name, email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User)

    const CheckUsersExist = await usersRepository.findOne({
      where: { email },
    })

    if (CheckUsersExist) {
      throw new AppError('this email exist')
    }

    const HashedPassword = await hash(password, 8)

    const user = usersRepository.create({
      name,
      email,
      password: HashedPassword,
    })

    await usersRepository.save(user)
    return user
  }
}

export default CreateUserServices
