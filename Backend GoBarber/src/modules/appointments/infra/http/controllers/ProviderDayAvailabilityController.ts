import { Request, Response } from 'express'
import { container } from 'tsyringe'
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService'

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params
    const { day, month, year } = request.body

    const listProviderdayAvailability = container.resolve(
      ListProviderDayAvailabilityService
    )

    const availability = await listProviderdayAvailability.execute({
      day,
      month,
      provider_id,
      year,
    })

    return response.json(availability)
  }
}
