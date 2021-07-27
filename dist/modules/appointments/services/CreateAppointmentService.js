"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const date_fns_1 = require("date-fns");
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
let CreateAppointmentService = class CreateAppointmentService {
    constructor(appointmentsRepository, notificationsRepository, cacheProvider) {
        this.appointmentsRepository = appointmentsRepository;
        this.notificationsRepository = notificationsRepository;
        this.cacheProvider = cacheProvider;
    }
    async execute({ date, provider_id, user_id, }) {
        const appointmentDate = date_fns_1.startOfHour(date);
        if (date_fns_1.isBefore(appointmentDate, Date.now())) {
            throw new AppError_1.default("You can't create an appointment on a past date.");
        }
        if (user_id === provider_id) {
            throw new AppError_1.default("You can't create an appointment with yourself.");
        }
        if (date_fns_1.getHours(appointmentDate) < 8 || date_fns_1.getHours(appointmentDate) > 17) {
            throw new AppError_1.default('You can only create appontments between 8am and 5pm.');
        }
        const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate, provider_id);
        if (findAppointmentInSameDate) {
            throw new AppError_1.default('This appointment is already booked');
        }
        const appointment = await this.appointmentsRepository.create({
            provider_id,
            user_id,
            date: appointmentDate,
        });
        const dateFormatted = date_fns_1.format(appointment.date, "dd/MM/yyyy 'às' HH:mm'h'");
        await this.notificationsRepository.create({
            recipient_id: provider_id,
            content: `Novo agendamento para dia ${dateFormatted}`,
        });
        await this.cacheProvider.invalidate(`provider-appointments:${provider_id}:${date_fns_1.format(appointmentDate, 'yyyy-M-d')}`);
        return appointment;
    }
};
CreateAppointmentService = __decorate([
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject('AppointmentsRepository')),
    __param(1, tsyringe_1.inject('NotificationsRepository')),
    __param(2, tsyringe_1.inject('CacheProvider')),
    __metadata("design:paramtypes", [Object, Object, Object])
], CreateAppointmentService);
exports.default = CreateAppointmentService;
