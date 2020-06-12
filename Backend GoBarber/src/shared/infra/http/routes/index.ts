import { Router } from 'express'
import appointmentsRoutes from '@modules/appointments/infra/http/routes/appointments.routes'
import usersRoutes from '@modules/users/infra/http/routes/users.routes'
import sessionRoutes from '@modules/users/infra/http/routes/session.routes'

const routes = Router()

routes.use('/appointments', appointmentsRoutes)
routes.use('/users', usersRoutes)
routes.use('/sessions', sessionRoutes)

export default routes
