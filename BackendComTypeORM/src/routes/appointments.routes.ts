import { Router } from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentServices from '../services/CreateAppointmentsServices'
import ensureAuthentication from '../middlewares/ensureAuthentication'

const appointmenstRoutes = Router()

appointmenstRoutes.use(ensureAuthentication)

appointmenstRoutes.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentsRepository)
  const appointments = await appointmentRepository.find()

  return response.json(appointments)
})

appointmenstRoutes.post('/', async (request, response) => {
  const { provider_id, date } = request.body

  const parseDate = parseISO(date)

  const createAppointment = new CreateAppointmentServices()

  const appointment = await createAppointment.execute({
    date: parseDate,
    provider_id,
  })

  return response.json(appointment)
})

export default appointmenstRoutes
