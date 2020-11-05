import { Router } from 'express'
import appointmentsRouter from '@modules/appointments/infra/typeorm/entities/http/routes/appoitments.routes'
import sessionsRouter from '@modules/users/infra/typeorm/entities/http/routes/sessions.routes'
import usersRouter from '@modules/users/infra/typeorm/entities/http/routes/users.routes'

const routes = Router()

routes.use('/appointments', appointmentsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)

export default routes
