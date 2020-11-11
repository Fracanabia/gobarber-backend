import ProviderDayAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderDayAvailabilityController'
import ProviderMonthAvailabilityController from '@modules/appointments/infra/http/controllers/ProviderMonthAvailabilityController'
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import { Router } from 'express'

const providersRouter = Router()
const providerController = new ProvidersController()
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController()
const providerDayAvailabilityController = new ProviderDayAvailabilityController()

providersRouter.use(ensureAuthenticated)

providersRouter.get('/', providerController.index)

providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index
)

providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index
)

export default providersRouter
