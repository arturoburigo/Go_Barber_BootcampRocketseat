import { Router } from 'express'
import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication'
import AppointmentsController from '../controllers/AppointmentsController'

const appointmenstRoutes = Router()
const appointmentsController = new AppointmentsController()

appointmenstRoutes.use(ensureAuthentication)

appointmenstRoutes.post('/', appointmentsController.create)

export default appointmenstRoutes
