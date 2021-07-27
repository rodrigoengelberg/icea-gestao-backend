"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuidv4_1 = require("uuidv4");
const MemberContact_1 = __importDefault(require("../../infra/typeorm/entities/MemberContact"));
class FakeMembersContactRepository {
    constructor() {
        this.membersContact = [];
    }
    async findById(id) {
        const findUser = this.membersContact.find(memberContact => memberContact.id === id);
        return findUser;
    }
    async findByMemberId(memberId) {
        const findUser = this.membersContact.find(memberContact => memberContact.member_id === memberId);
        return findUser;
    }
    async create(memberContactData) {
        const memberContact = new MemberContact_1.default();
        Object.assign(memberContact, { id: uuidv4_1.uuid() }, memberContactData);
        this.membersContact.push(memberContact);
        return memberContact;
    }
    async save(memberContact) {
        const findIndex = this.membersContact.findIndex(findMemberContact => findMemberContact.id === memberContact.id);
        this.membersContact[findIndex] = memberContact;
        return memberContact;
    }
}
exports.default = FakeMembersContactRepository;
