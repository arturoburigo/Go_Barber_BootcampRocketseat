import { Router } from 'express'
import appointmentsRoutes from './appointments.routes'
import usersRoutes from './users.routes'
import sessionRoutes from './session.routes'

const routes = Router()

routes.use('/appointments', appointmentsRoutes)
routes.use('/users', usersRoutes)
routes.use('/sessions', sessionRoutes)

export default routes
