"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const FakeUsersRepository_1 = __importDefault(require("../repositories/fakes/FakeUsersRepository"));
const FakeHashProvider_1 = __importDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));
const AuthenticateUserService_1 = __importDefault(require("./AuthenticateUserService"));
let fakeUsersRepository;
let fakeHashProvider;
let authenticateUser;
describe('AuthenticateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository_1.default();
        fakeHashProvider = new FakeHashProvider_1.default();
        authenticateUser = new AuthenticateUserService_1.default(fakeUsersRepository, fakeHashProvider);
    });
    it('should be able to authenticate', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123123',
        });
        const response = await authenticateUser.execute({
            email: 'johndoe@example.com',
            password: '123123',
        });
        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });
    it('should not be able to authenticate with a non existing user', async () => {
        await expect(authenticateUser.execute({
            email: 'johndoe@example.com',
            password: '123123',
        })).rejects.toBeInstanceOf(AppError_1.default);
    });
    it('should not be able to authenticate with wrong password', async () => {
        await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123123',
        });
        await expect(authenticateUser.execute({
            email: 'johndoe@example.com',
            password: 'wrong-password',
        })).rejects.toBeInstanceOf(AppError_1.default);
    });
});
