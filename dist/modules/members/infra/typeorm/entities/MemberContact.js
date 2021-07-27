"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Member_1 = __importDefault(require("./Member"));
let MemberContact = class MemberContact {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], MemberContact.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], MemberContact.prototype, "member_id", void 0);
__decorate([
    typeorm_1.OneToOne(() => Member_1.default),
    typeorm_1.JoinColumn({ name: 'member_id' }),
    __metadata("design:type", Member_1.default)
], MemberContact.prototype, "member", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], MemberContact.prototype, "lougradouro", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], MemberContact.prototype, "estado", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], MemberContact.prototype, "cidade", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MemberContact.prototype, "cep", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], MemberContact.prototype, "tipoTelefone", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], MemberContact.prototype, "numeroTelefone", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], MemberContact.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], MemberContact.prototype, "updated_at", void 0);
MemberContact = __decorate([
    typeorm_1.Entity('membersContact')
], MemberContact);
exports.default = MemberContact;
