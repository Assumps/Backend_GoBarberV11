import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/Appointments';
// DTO - data transfer object

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
    public async findByDate(date: Date): Promise<Appointment | null> {
        const findAppointment = await this.findOne({ where: { date } });

        return findAppointment || null;
    }

    // provider: string, date: Date
}

export default AppointmentsRepository;
