import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.params.id
    const { month, year } = request.body

    const listProvidersMonthAvailability = container.resolve(
      ListProviderMonthAvailabilityService
    )

    const availability = await listProvidersMonthAvailability.execute({
      provider_id,
      month,
      year,
    })

    return response.json(availability)
  }
}
