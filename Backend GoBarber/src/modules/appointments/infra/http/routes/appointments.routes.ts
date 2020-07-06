import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'

import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication'
import AppointmentsController from '../controllers/AppointmentsController'
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController'

const appointmenstRoutes = Router()
const appointmentsController = new AppointmentsController()
const providerAppointmentsController = new ProviderAppointmentsController()

appointmenstRoutes.use(ensureAuthentication)

appointmenstRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create
)
appointmenstRoutes.get('/me', providerAppointmentsController.index)

export default appointmenstRoutes
