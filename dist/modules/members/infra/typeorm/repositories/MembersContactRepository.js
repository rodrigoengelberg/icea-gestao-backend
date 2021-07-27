"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const MemberContact_1 = __importDefault(require("../entities/MemberContact"));
class UsersRepository {
    constructor() {
        this.ormRepository = typeorm_1.getRepository(MemberContact_1.default);
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
    async create(membersContactData) {
        const memberContact = this.ormRepository.create(membersContactData);
        await this.ormRepository.save(memberContact);
        return memberContact;
    }
    async save(membersContact) {
        return this.ormRepository.save(membersContact);
    }
}
exports.default = UsersRepository;
