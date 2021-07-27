"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const User_1 = __importDefault(require("../entities/User"));
class UsersRepository {
    constructor() {
        this.ormRepository = typeorm_1.getRepository(User_1.default);
    }
    async findById(id) {
        const findAppointment = await this.ormRepository.findOne(id);
        return findAppointment;
    }
    async findByEmail(email) {
        const findAppointment = await this.ormRepository.findOne({
            where: { email },
        });
        return findAppointment;
    }
    async findAllProviders({ except_user_id, }) {
        let users;
        if (except_user_id) {
            users = await this.ormRepository.find({
                where: {
                    id: typeorm_1.Not(except_user_id),
                },
            });
        }
        else {
            users = await this.ormRepository.find();
        }
        return users;
    }
    async create(userData) {
        const user = this.ormRepository.create(userData);
        await this.ormRepository.save(user);
        return user;
    }
    async save(user) {
        return this.ormRepository.save(user);
    }
}
exports.default = UsersRepository;
