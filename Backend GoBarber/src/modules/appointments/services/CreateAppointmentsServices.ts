import { startOfHour } from 'date-fns'
import AppError from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import Appointment from '../infra/typeorm/entities/Appointment'
import 'express-async-errors'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IRequestDTO {
  provider_id: string

  date: Date
}

@injectable()
class CreateAppointmentServices {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    date,
    provider_id,
  }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    const findAppointmentsinTheSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    )
    if (findAppointmentsinTheSameDate) {
      throw new AppError(' appointment is alredy marked ')
    }
    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    })

    return appointment
  }
}
export default CreateAppointmentServices
