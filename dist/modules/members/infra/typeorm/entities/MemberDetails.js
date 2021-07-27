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
const class_transformer_1 = require("class-transformer");
const upload_1 = __importDefault(require("@config/upload"));
const Member_1 = __importDefault(require("./Member"));
let MemberDetails = class MemberDetails {
    getAvatarUrl() {
        if (!this.avatar) {
            return null;
        }
        switch (process.env.STORAGE_DRIVER) {
            case 'disk':
                return `${process.env.APP_API_URL}/files/${this.avatar}`;
            case 's3':
                return `https://${upload_1.default.config.aws.bucket}.s3.amazonaws.com/${this.avatar}`;
            default:
                return null;
        }
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], MemberDetails.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], MemberDetails.prototype, "member_id", void 0);
__decorate([
    typeorm_1.OneToOne(() => Member_1.default),
    typeorm_1.JoinColumn({ name: 'member_id' }),
    __metadata("design:type", Member_1.default)
], MemberDetails.prototype, "member", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], MemberDetails.prototype, "avatar", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], MemberDetails.prototype, "occupation", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], MemberDetails.prototype, "schooling", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], MemberDetails.prototype, "facebook_link", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], MemberDetails.prototype, "instagram_link", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], MemberDetails.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], MemberDetails.prototype, "updated_at", void 0);
__decorate([
    class_transformer_1.Expose({ name: 'avatar_url' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], MemberDetails.prototype, "getAvatarUrl", null);
MemberDetails = __decorate([
    typeorm_1.Entity('membersDetails')
], MemberDetails);
exports.default = MemberDetails;
