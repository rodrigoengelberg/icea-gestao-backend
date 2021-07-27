"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsyringe_1 = require("tsyringe");
const ListProvidersService_1 = __importDefault(require("@modules/appointments/services/ListProvidersService"));
class ProvidersController {
    async index(request, response) {
        const user_id = request.user.id;
        const listProviders = tsyringe_1.container.resolve(ListProvidersService_1.default);
        const providers = await listProviders.execute({
            user_id,
        });
        return response.json(providers);
    }
}
exports.default = ProvidersController;
