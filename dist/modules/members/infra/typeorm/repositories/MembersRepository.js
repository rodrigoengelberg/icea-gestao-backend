"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Member_1 = __importDefault(require("../entities/Member"));
class MembersRepository {
    constructor() {
        this.ormRepository = typeorm_1.getRepository(Member_1.default);
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
    async create(userData) {
        const user = this.ormRepository.create(userData);
        await this.ormRepository.save(user);
        return user;
    }
    async save(user) {
        return this.ormRepository.save(user);
    }
}
exports.default = MembersRepository;
