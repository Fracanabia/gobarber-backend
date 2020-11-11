import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class ProvideDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.params.id
    const { year, month, day } = request.body
    const listProvidersDayAvailability = container.resolve(
      ListProviderDayAvailabilityService
    )

    const availability = await listProvidersDayAvailability.execute({
      provider_id,
      year,
      month,
      day,
    })

    return response.json(availability)
  }
}
