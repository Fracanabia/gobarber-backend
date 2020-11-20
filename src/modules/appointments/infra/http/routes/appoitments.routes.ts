import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController'
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import { Router } from 'express'

const appointmentsRouter = Router()
const appointmentController = new AppointmentsController()
const providerAppointmentsController = new ProviderAppointmentsController()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.post('/', appointmentController.create)
appointmentsRouter.get('/me', providerAppointmentsController.index)

export default appointmentsRouter
