"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuidv4_1 = require("uuidv4");
const date_fns_1 = require("date-fns");
const Appointment_1 = __importDefault(require("@modules/appointments/infra/typeorm/entities/Appointment"));
class FakeAppointmentsRepository {
    constructor() {
        this.appointments = [];
    }
    async findByDate(date, provider_id) {
        const findAppointment = this.appointments.find(appointment => date_fns_1.isEqual(appointment.date, date) &&
            appointment.provider_id === provider_id);
        return findAppointment;
    }
    async findAllInMonthFromProvider({ provider_id, month, year, }) {
        const appointments = this.appointments.filter(appointment => appointment.provider_id === provider_id &&
            date_fns_1.getMonth(appointment.date) + 1 === month &&
            date_fns_1.getYear(appointment.date) === year);
        return appointments;
    }
    async findAllInDayFromProvider({ provider_id, day, month, year, }) {
        const appointments = this.appointments.filter(appointment => appointment.provider_id === provider_id &&
            date_fns_1.getDate(appointment.date) === day &&
            date_fns_1.getMonth(appointment.date) + 1 === month &&
            date_fns_1.getYear(appointment.date) === year);
        return appointments;
    }
    async create({ provider_id, user_id, date, }) {
        const appointment = new Appointment_1.default();
        Object.assign(appointment, { id: uuidv4_1.uuid(), date, provider_id, user_id });
        this.appointments.push(appointment);
        return appointment;
    }
}
exports.default = FakeAppointmentsRepository;
