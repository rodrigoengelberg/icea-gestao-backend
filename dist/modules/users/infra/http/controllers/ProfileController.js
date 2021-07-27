"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const class_transformer_1 = require("class-transformer");
const UpdateProfileService_1 = __importDefault(require("@modules/users/services/UpdateProfileService"));
const ShowProfileService_1 = __importDefault(require("@modules/users/services/ShowProfileService"));
class ProfileController {
    async show(request, response) {
        const user_id = request.user.id;
        const showProfile = tsyringe_1.container.resolve(ShowProfileService_1.default);
        const user = await showProfile.execute({
            user_id,
        });
        return response.json(class_transformer_1.classToClass(user));
    }
    async update(request, response) {
        const user_id = request.user.id;
        const { name, email, old_password, password } = request.body;
        const updateProfile = tsyringe_1.container.resolve(UpdateProfileService_1.default);
        const user = await updateProfile.execute({
            user_id,
            name,
            email,
            old_password,
            password,
        });
        return response.json(class_transformer_1.classToClass(user));
    }
}
exports.default = ProfileController;
