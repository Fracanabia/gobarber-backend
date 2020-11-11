import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO'
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO'
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment | undefined>
  findAllInMonthFromProvider(
    date: IFindAllInMonthFromProviderDTO
  ): Promise<Appointment[]>
  findAllInDayFromProvider(
    date: IFindAllInDayFromProviderDTO
  ): Promise<Appointment[]>
}
