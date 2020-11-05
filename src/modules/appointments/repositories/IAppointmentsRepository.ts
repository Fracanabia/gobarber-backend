import Appointement from '@modules/appointments/infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

export interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointement>
  findByDate(date: Date): Promise<Appointement | undefined>
}
