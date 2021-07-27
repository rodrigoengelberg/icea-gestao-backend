"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const class_transformer_1 = require("class-transformer");
const CreateMemberService_1 = __importDefault(require("@modules/members/services/CreateMemberService"));
class SessionsController {
    async create(request, response) {
        const { first_name, last_name, email, gender, member_type, marital_status, nationality, birth_date } = request.body;
        const createUser = tsyringe_1.container.resolve(CreateMemberService_1.default);
        const user = await createUser.execute({
            first_name,
            last_name,
            email,
            gender,
            member_type,
            marital_status,
            nationality,
            birth_date
        });
        return response.json(class_transformer_1.classToClass(user));
    }
}
exports.default = SessionsController;
