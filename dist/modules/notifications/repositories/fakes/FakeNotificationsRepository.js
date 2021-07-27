"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const Notification_1 = __importDefault(require("../../infra/typeorm/schemas/Notification"));
class NotificationsRepository {
    constructor() {
        this.notifications = [];
    }
    async create({ recipient_id, content, }) {
        const notification = new Notification_1.default();
        Object.assign(notification, { id: new mongodb_1.ObjectID(), recipient_id, content });
        this.notifications.push(notification);
        return notification;
    }
}
exports.default = NotificationsRepository;
