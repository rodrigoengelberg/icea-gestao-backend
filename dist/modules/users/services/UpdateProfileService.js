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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const AppError_1 = __importDefault(require("@shared/errors/AppError"));
let UpdateProfileService = class UpdateProfileService {
    constructor(usersRepository, hashProvider) {
        this.usersRepository = usersRepository;
        this.hashProvider = hashProvider;
    }
    async execute({ user_id, name, email, old_password, password, }) {
        const user = await this.usersRepository.findById(user_id);
        if (!user) {
            throw new AppError_1.default('User not found');
        }
        const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);
        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
            throw new AppError_1.default('E-mail already in use.');
        }
        user.name = name;
        user.email = email;
        if (password && !old_password) {
            throw new AppError_1.default('You need to inform old password to set a new password.');
        }
        if (password && old_password) {
            const checkOldPassword = await this.hashProvider.compareHash(old_password, user.password);
            if (!checkOldPassword) {
                throw new AppError_1.default('Old password does not match.');
            }
            user.password = await this.hashProvider.generateHash(password);
        }
        return this.usersRepository.save(user);
    }
};
UpdateProfileService = __decorate([
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject('UsersRepository')),
    __param(1, tsyringe_1.inject('HashProvider')),
    __metadata("design:paramtypes", [Object, Object])
], UpdateProfileService);
exports.default = UpdateProfileService;
