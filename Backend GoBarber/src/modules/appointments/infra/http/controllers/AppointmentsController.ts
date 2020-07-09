import { Request, Response } from 'express'

import { container } from 'tsyringe'
import { classToClass } from 'class-transformer'

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentsServices'

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id
    const { provider_id, date } = request.body

    const createAppointment = container.resolve(CreateAppointmentService)

    const appointment = await createAppointment.execute({
      user_id,
      date,
      provider_id,
    })

    return response.json(classToClass(appointment))
  }
}
