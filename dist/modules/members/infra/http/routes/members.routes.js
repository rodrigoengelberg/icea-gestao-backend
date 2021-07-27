"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const MembersController_1 = __importDefault(require("../controllers/MembersController"));
const membersRouter = express_1.Router();
const membersController = new MembersController_1.default();
membersRouter.post('/', celebrate_1.celebrate({
    [celebrate_1.Segments.BODY]: {
        first_name: celebrate_1.Joi.string().required(),
        last_name: celebrate_1.Joi.string().required(),
        email: celebrate_1.Joi.string().email().required(),
        gender: celebrate_1.Joi.string().required(),
        member_type: celebrate_1.Joi.string().required(),
        marital_status: celebrate_1.Joi.string().required(),
        nationality: celebrate_1.Joi.string().required(),
        birth_date: celebrate_1.Joi.date().required()
    },
}), membersController.create);
exports.default = membersRouter;
