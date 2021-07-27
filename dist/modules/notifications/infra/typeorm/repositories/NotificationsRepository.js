"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Notification_1 = __importDefault(require("../schemas/Notification"));
class NotificationsRepository {
    constructor() {
        this.ormRepository = typeorm_1.getMongoRepository(Notification_1.default, 'mongo');
    }
    async create({ recipient_id, content, }) {
        const notification = this.ormRepository.create({
            recipient_id,
            content,
        });
        await this.ormRepository.save(notification);
        return notification;
    }
}
exports.default = NotificationsRepository;
