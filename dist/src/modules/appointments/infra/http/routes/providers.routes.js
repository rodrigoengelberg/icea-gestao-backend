"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const ensureAuthenticated_1 = __importDefault(require("@modules/users/infra/http/middlewares/ensureAuthenticated"));
const ProvidersController_1 = __importDefault(require("../controllers/ProvidersController"));
const ProviderMonthAvailabilityController_1 = __importDefault(require("../controllers/ProviderMonthAvailabilityController"));
const ProviderDayAvailabilityController_1 = __importDefault(require("../controllers/ProviderDayAvailabilityController"));
const providersRouter = express_1.Router();
const providersController = new ProvidersController_1.default();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController_1.default();
const providerDayAvailabilityController = new ProviderDayAvailabilityController_1.default();
providersRouter.use(ensureAuthenticated_1.default);
providersRouter.get('/', providersController.index);
providersRouter.get('/:provider_id/month-availability', celebrate_1.celebrate({
    [celebrate_1.Segments.PARAMS]: {
        provider_id: celebrate_1.Joi.string().uuid().required(),
    },
}), providerMonthAvailabilityController.index);
providersRouter.get('/:provider_id/day-availability', celebrate_1.celebrate({
    [celebrate_1.Segments.PARAMS]: {
        provider_id: celebrate_1.Joi.string().uuid().required(),
    },
}), providerDayAvailabilityController.index);
exports.default = providersRouter;
