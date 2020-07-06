import { startOfHour, isBefore, getHours, format } from 'date-fns'
import AppError from '@shared/errors/AppError'
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository'
import { inject, injectable } from 'tsyringe'
import Appointment from '../infra/typeorm/entities/Appointment'
import 'express-async-errors'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

interface IRequestDTO {
  provider_id: string
  user_id: string
  date: Date
}

@injectable()
class CreateAppointmentServices {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError('You can not create an appointment on a past date')
    }

    if (user_id === provider_id) {
      throw new AppError('You can not create an appointment with yourself')
    }

    const hour = getHours(appointmentDate)

    if (hour < 8 || hour > 17) {
      throw new AppError(
        'You can only create appointments between 8 AM and 5 PM'
      )
    }

    const findAppointmentsinTheSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    )
    if (findAppointmentsinTheSameDate) {
      throw new AppError(' appointment is alredy marked ')
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    })

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'to' HH:mm'hr'")

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `new schedule for the day ${dateFormatted} `,
    })

    return appointment
  }
}
export default CreateAppointmentServices
