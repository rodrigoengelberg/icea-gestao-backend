"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
const FakeCacheProvider_1 = __importDefault(require("@shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));
const FakeUsersRepository_1 = __importDefault(require("../repositories/fakes/FakeUsersRepository"));
const FakeHashProvider_1 = __importDefault(require("../providers/HashProvider/fakes/FakeHashProvider"));
const CreateUserService_1 = __importDefault(require("./CreateUserService"));
let fakeUsersRepository;
let fakeHashProvider;
let fakeCacheProvider;
let createUser;
describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository_1.default();
        fakeHashProvider = new FakeHashProvider_1.default();
        fakeCacheProvider = new FakeCacheProvider_1.default();
        createUser = new CreateUserService_1.default(fakeUsersRepository, fakeHashProvider, fakeCacheProvider);
    });
    it('should be able to create a new user', async () => {
        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123123',
        });
        expect(user).toHaveProperty('id');
    });
    it('should not be able to create a new user with email from another', async () => {
        await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123123',
        });
        await expect(createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123123',
        })).rejects.toBeInstanceOf(AppError_1.default);
    });
});
