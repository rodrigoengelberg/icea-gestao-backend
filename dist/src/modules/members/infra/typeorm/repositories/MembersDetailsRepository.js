"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const MemberDetails_1 = __importDefault(require("../entities/MemberDetails"));
class MembersDetailsRepository {
    constructor() {
        this.ormRepository = typeorm_1.getRepository(MemberDetails_1.default);
    }
    async findById(id) {
        const findAppointment = await this.ormRepository.findOne(id);
        return findAppointment;
    }
    async findByMemberId(member_id) {
        const findAppointment = await this.ormRepository.findOne({
            where: { member_id },
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
exports.default = MembersDetailsRepository;
