import AppointmentsRepository from '../repositories/AppointmentsRepository'
import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import Appointment from '../models/Appointment'
import AppError from '../error/AppError'
import 'express-async-errors'

interface RequestDTO {
  provider_id: string

  date: Date
}
class CreateAppointmentServices {
  public async execute({
    date,
    provider_id,
  }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const appointmentDate = startOfHour(date)

    const findAppointmentsinTheSameDate = await appointmentsRepository.findByDate(
      appointmentDate
    )
    if (findAppointmentsinTheSameDate) {
      throw new AppError(' appointment is alredy marked ')
    }
    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    })

    await appointmentsRepository.save(appointment)

    return appointment
  }
}
export default CreateAppointmentServices
