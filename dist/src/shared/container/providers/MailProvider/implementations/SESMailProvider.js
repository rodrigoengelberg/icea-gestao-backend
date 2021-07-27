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
const nodemailer_1 = __importDefault(require("nodemailer"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const mail_1 = __importDefault(require("@config/mail"));
let SESMailProvider = class SESMailProvider {
    constructor(mailTemplateProvider) {
        this.mailTemplateProvider = mailTemplateProvider;
        this.client = nodemailer_1.default.createTransport({
            SES: new aws_sdk_1.default.SES({
                apiVersion: '2010-12-01',
                region: 'us-east-1',
            }),
        });
    }
    async sendMail({ from, to, subject, templateData, }) {
        const { name, email } = mail_1.default.defaults.from;
        await this.client.sendMail({
            from: {
                name: (from === null || from === void 0 ? void 0 : from.name) || name,
                address: (from === null || from === void 0 ? void 0 : from.email) || email,
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await this.mailTemplateProvider.parse(templateData),
        });
    }
};
SESMailProvider = __decorate([
    tsyringe_1.injectable(),
    __param(0, tsyringe_1.inject('MailTemplateProvider')),
    __metadata("design:paramtypes", [Object])
], SESMailProvider);
exports.default = SESMailProvider;
