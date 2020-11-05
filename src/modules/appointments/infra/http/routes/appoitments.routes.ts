import { Router } from 'express'
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const appointmentsRouter = Router()
const appointmentController = new AppointmentsController()

appointmentsRouter.use(ensureAuthenticated)

appointmentsRouter.post('/', appointmentController.create)

export default appointmentsRouter
