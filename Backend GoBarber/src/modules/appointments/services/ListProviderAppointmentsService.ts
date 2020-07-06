import { injectable, inject } from 'tsyringe'
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'
import Appointment from '../infra/typeorm/entities/Appointment'

interface IRequest {
  provider_id: string
  month: number
  day: number
  year: number
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        year,
        month,
        day,
      }
    )

    return appointments
  }
}

export default ListProviderAppointmentsService
