"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsService = void 0;
const common_1 = require("@nestjs/common");
const aws_sdk_1 = require("aws-sdk");
const common_2 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let AwsService = class AwsService {
    constructor(configService) {
        this.configService = configService;
    }
    async ProfilePictureUpload(file) {
        const { originalname } = file;
        const bucketS3 = this.configService.get("AWS_BUCKET_NAME");
        await this.uploadS3(file.buffer, bucketS3, originalname);
    }
    async uploadS3(file, bucket, name) {
        const s3 = this.getS3();
        const params = {
            Bucket: bucket,
            Key: String(name),
            Body: file,
        };
        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
                if (err) {
                    common_2.Logger.error(err);
                    reject(err.message);
                }
                resolve(data);
            });
        });
    }
    getS3() {
        return new aws_sdk_1.S3({
            accessKeyId: this.configService.get("AWS_ACCESS_KEY_ID"),
            secretAccessKey: this.configService.get("AWS_SECRET_ACCESS_KEY"),
        });
    }
};
AwsService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AwsService);
exports.AwsService = AwsService;
//# sourceMappingURL=aws.service.js.map