import { Router } from 'express'
import AuthenticateServices from '../services/AuthenticateServices'

const sessionRoutes = Router()
sessionRoutes.post('/', async (request, response) => {
  const { email, password } = request.body
  const userServices = new AuthenticateServices()
  const { user, token } = await userServices.execute({
    email,
    password,
  })
  delete user.password

  return response.json({ user, token })
})

export default sessionRoutes
