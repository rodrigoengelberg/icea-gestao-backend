"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuidv4_1 = require("uuidv4");
const Member_1 = __importDefault(require("../../infra/typeorm/entities/Member"));
class FakeMembersRepository {
    constructor() {
        this.members = [];
    }
    async findById(id) {
        const findUser = this.members.find(member => member.id === id);
        return findUser;
    }
    async findByEmail(email) {
        const findUser = this.members.find(member => member.email === email);
        return findUser;
    }
    async create(memberData) {
        const member = new Member_1.default();
        Object.assign(member, { id: uuidv4_1.uuid() }, memberData);
        this.members.push(member);
        return member;
    }
    async save(member) {
        const findIndex = this.members.findIndex(findMember => findMember.id === member.id);
        this.members[findIndex] = member;
        return member;
    }
}
exports.default = FakeMembersRepository;
