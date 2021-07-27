"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const mime_1 = __importDefault(require("mime"));
const upload_1 = __importDefault(require("@config/upload"));
class S3StorageProvider {
    constructor() {
        this.client = new aws_sdk_1.default.S3({
            region: 'us-east-1',
        });
    }
    async saveFile(file) {
        const originalPath = path_1.default.resolve(upload_1.default.tmpFolder, file);
        const ContentType = mime_1.default.getType(originalPath);
        if (!ContentType) {
            throw Error('File not found');
        }
        const fileContent = await fs_1.default.promises.readFile(originalPath);
        await this.client
            .putObject({
            Bucket: upload_1.default.config.aws.bucket,
            Key: file,
            ACL: 'public-read',
            Body: fileContent,
            ContentType,
        })
            .promise();
        await fs_1.default.promises.unlink(originalPath);
        return file;
    }
    async deleteFile(file) {
        await this.client
            .deleteObject({
            Bucket: upload_1.default.config.aws.bucket,
            Key: file,
        })
            .promise();
    }
}
exports.default = S3StorageProvider;
