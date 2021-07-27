"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const multer_1 = __importDefault(require("multer"));
const tmpFolder = path_1.default.resolve(__dirname, '..', '..', 'tmp');
exports.default = {
    driver: process.env.STORAGE_DRIVER,
    tmpFolder,
    uploadsFolder: path_1.default.resolve(tmpFolder, 'uploads'),
    multer: {
        storage: multer_1.default.diskStorage({
            destination: tmpFolder,
            filename(request, file, callback) {
                const filehash = crypto_1.default.randomBytes(10).toString('hex');
                const fileName = `${filehash}-${file.originalname}`;
                return callback(null, fileName);
            },
        }),
    },
    config: {
        disk: {},
        aws: {
            bucket: 'app-gobarber-2',
        },
    },
};
