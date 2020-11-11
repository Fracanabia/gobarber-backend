import ListProvidersService from '@modules/appointments/services/ListProvidersService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export default class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const listProviders = container.resolve(ListProvidersService)

    const providers = await listProviders.execute({
      user_id,
    })

    const providerWithoutPassword = providers.map(provider => {
      return {
        id: provider.id,
        name: provider.name,
        email: provider.email,
        avatar: provider.avatar,
        created_at: provider.created_at,
        updated_at: provider.updated_at,
      }
    })

    return response.json(providerWithoutPassword)
  }
}
