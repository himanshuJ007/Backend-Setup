import { S3 } from 'aws-sdk';
import { ConfigService } from "@nestjs/config";
export declare class AwsService {
    private configService;
    constructor(configService: ConfigService);
    ProfilePictureUpload(file: any): Promise<void>;
    uploadS3(file: any, bucket: any, name: any): Promise<unknown>;
    getS3(): S3;
}
