"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const class_transformer_1 = require("class-transformer");
const CreateUserService_1 = __importDefault(require("@modules/users/services/CreateUserService"));
class SessionsController {
    async create(request, response) {
        const { name, email, password } = request.body;
        const createUser = tsyringe_1.container.resolve(CreateUserService_1.default);
        const user = await createUser.execute({
            name,
            email,
            password,
        });
        return response.json(class_transformer_1.classToClass(user));
    }
}
exports.default = SessionsController;
