import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO'
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO'
import Appointement from '@modules/appointments/infra/typeorm/entities/Appointment'
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import { getRepository, Raw, Repository } from 'typeorm'

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointement>

  constructor() {
    this.ormRepository = getRepository(Appointement)
  }

  public async findByDate(date: Date): Promise<Appointement | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    })

    return findAppointment
  }

  public async findAllInMonthFromProvider({
    provider_id,
    year,
    month,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointement[]> {
    const parseMonth = String(month).padStart(2, '0')
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parseMonth}-${year}'`
        ),
      },
    })

    return appointments
  }

  public async findAllInDayFromProvider({
    provider_id,
    year,
    month,
    day,
  }: IFindAllInDayFromProviderDTO): Promise<Appointement[]> {
    const parseMonth = String(month).padStart(2, '0')
    const parseDay = String(day).padStart(2, '0')
    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parseDay}-${parseMonth}-${year}'`
        ),
      },
    })

    return appointments
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointement> {
    const appointment = this.ormRepository.create({ provider_id, date })
    await this.ormRepository.save(appointment)
    return appointment
  }
}

export default AppointmentsRepository
