import { Request, Response } from 'express'
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService'
import { container } from 'tsyringe'

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const authenticateUser = container.resolve(AuthenticateUserService)

    const { user, token } = await authenticateUser.execute({ email, password })

    const userWithoutPassword = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
      token,
    }

    return response.json(userWithoutPassword)
  }
}
