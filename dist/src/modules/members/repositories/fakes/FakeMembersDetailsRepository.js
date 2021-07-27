"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuidv4_1 = require("uuidv4");
const MemberDetails_1 = __importDefault(require("../../infra/typeorm/entities/MemberDetails"));
class FakeMembersDetailsRepository {
    constructor() {
        this.membersDetails = [];
    }
    async findById(id) {
        const findUser = this.membersDetails.find(memberContact => memberContact.id === id);
        return findUser;
    }
    async findByMemberId(memberId) {
        const findUser = this.membersDetails.find(memberContact => memberContact.member_id === memberId);
        return findUser;
    }
    async create(memberContactData) {
        const memberDetails = new MemberDetails_1.default();
        Object.assign(memberDetails, { id: uuidv4_1.uuid() }, memberContactData);
        this.membersDetails.push(memberDetails);
        return memberDetails;
    }
    async save(memberContact) {
        const findIndex = this.membersDetails.findIndex(findMemberContact => findMemberContact.id === memberContact.id);
        this.membersDetails[findIndex] = memberContact;
        return memberContact;
    }
}
exports.default = FakeMembersDetailsRepository;
