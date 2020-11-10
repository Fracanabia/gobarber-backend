import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO'
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO'
import Appointement from '@modules/appointments/infra/typeorm/entities/Appointment'

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointement>
  findByDate(date: Date): Promise<Appointement | undefined>
  findAllInMonthFromProvider(
    date: IFindAllInMonthFromProviderDTO
  ): Promise<Appointement[]>
  findAllInDayFromProvider(
    date: IFindAllInDayFromProviderDTO
  ): Promise<Appointement[]>
}
