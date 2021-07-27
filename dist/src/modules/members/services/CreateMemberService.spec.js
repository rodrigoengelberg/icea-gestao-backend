"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const FakeCacheProvider_1 = __importDefault(require("@shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));
let fakeCacheProvider;
describe('CreateUser', () => {
    beforeEach(() => {
        fakeCacheProvider = new FakeCacheProvider_1.default();
    });
    it('should be able to create a new user', async () => {
    });
    it('should not be able to create a new user with email from another', async () => {
    });
});
