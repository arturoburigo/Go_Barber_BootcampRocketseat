import { Request, Response } from 'express'
import { container } from 'tsyringe'

import AuthenticateServices from '@modules/users/services/AuthenticateServices'

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body
    const userServices = container.resolve(AuthenticateServices)
    const { user, token } = await userServices.execute({
      email,
      password,
    })
    delete user.password

    return response.json({ user, token })
  }
}
