import Appointement from '@modules/appointments/infra/typeorm/entities/Appointment'
import { IAppointmentsRepository } from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'
import { uuid } from 'uuidv4'

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointement[] = []

  public async findByDate(date: Date): Promise<Appointement | undefined> {
    const findAppointment = this.appointments.find(
      appointment => appointment.date === date
    )

    return findAppointment
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointement> {
    const appointment = new Appointement()

    Object.assign(appointment, { id: uuid(), date, provider_id })

    this.appointments.push(appointment)

    return appointment
  }
}

export default AppointmentsRepository
