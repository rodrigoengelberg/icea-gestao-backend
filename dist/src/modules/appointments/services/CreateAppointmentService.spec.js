"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const FakeNotificationsRepository_1 = __importDefault(require("@modules/notifications/repositories/fakes/FakeNotificationsRepository"));
const FakeCacheProvider_1 = __importDefault(require("@shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));
const FakeAppointmentsRepository_1 = __importDefault(require("../repositories/fakes/FakeAppointmentsRepository"));
const CreateAppointmentService_1 = __importDefault(require("./CreateAppointmentService"));
let fakeAppointmentsRepository;
let fakeNotificationsRepository;
let fakeCacheProvider;
let createAppointment;
describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository_1.default();
        fakeNotificationsRepository = new FakeNotificationsRepository_1.default();
        fakeCacheProvider = new FakeCacheProvider_1.default();
        createAppointment = new CreateAppointmentService_1.default(fakeAppointmentsRepository, fakeNotificationsRepository, fakeCacheProvider);
    });
    it('should be able to create a new appointment', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 4, 10, 12).getTime();
        });
        const appointment = await createAppointment.execute({
            date: new Date(2021, 4, 10, 13),
            provider_id: 'provider-id',
            user_id: 'user-id',
        });
        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('provider-id');
    });
    it('should not be able to create two appointments on the same time', async () => {
        const appointmentDate = new Date(2021, 4, 10, 11);
        await createAppointment.execute({
            date: appointmentDate,
            provider_id: 'provider-id',
            user_id: 'user-id',
        });
        await expect(createAppointment.execute({
            date: appointmentDate,
            provider_id: 'provider-id',
            user_id: 'user-id',
        })).rejects.toBeInstanceOf(AppError_1.default);
    });
    it('should not be able to create an appointment on a past date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 4, 10, 12).getTime();
        });
        await expect(createAppointment.execute({
            date: new Date(2021, 4, 10, 11),
            provider_id: 'provider-id',
            user_id: 'user-id',
        })).rejects.toBeInstanceOf(AppError_1.default);
    });
    it('should not be able to create an appointment with same user as provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 4, 10, 12).getTime();
        });
        await expect(createAppointment.execute({
            date: new Date(2021, 4, 10, 13),
            provider_id: 'user-id',
            user_id: 'user-id',
        })).rejects.toBeInstanceOf(AppError_1.default);
    });
    it('should not be able to create an appointment before 8am and after 5pm', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2021, 4, 10, 12).getTime();
        });
        await expect(createAppointment.execute({
            date: new Date(2021, 4, 11, 7),
            provider_id: 'user-id',
            user_id: 'provider-id',
        })).rejects.toBeInstanceOf(AppError_1.default);
        await expect(createAppointment.execute({
            date: new Date(2021, 4, 11, 18),
            provider_id: 'user-id',
            user_id: 'provider-id',
        })).rejects.toBeInstanceOf(AppError_1.default);
    });
});
