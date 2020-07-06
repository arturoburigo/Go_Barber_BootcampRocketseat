import { Request, Response } from 'express'
import { classToClass } from 'class-transformer'
import { container } from 'tsyringe'
import CreateUserServices from '@modules/users/services/CreateUserServices'

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body
    const createUser = container.resolve(CreateUserServices)

    const user = await createUser.execute({
      name,
      email,
      password,
    })

    return response.json(classToClass(user))
  }
}
