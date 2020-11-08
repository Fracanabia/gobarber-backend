import { Router } from 'express'
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const providersRouter = Router()
const providerController = new ProvidersController()

providersRouter.use(ensureAuthenticated)

providersRouter.get('/', providerController.index)

export default providersRouter
