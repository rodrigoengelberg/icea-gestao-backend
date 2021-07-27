"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const class_transformer_1 = require("class-transformer");
const AuthenticateUserService_1 = __importDefault(require("@modules/users/services/AuthenticateUserService"));
class SessionsController {
    async create(request, response) {
        const { email, password } = request.body;
        const authenticateUser = tsyringe_1.container.resolve(AuthenticateUserService_1.default);
        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });
        return response.json({ user: class_transformer_1.classToClass(user), token });
    }
}
exports.default = SessionsController;
