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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const bcrypt = require("bcryptjs");
const aws_service_1 = require("../aws/aws.service");
let UserService = class UserService {
    constructor(userModel, awsService) {
        this.userModel = userModel;
        this.awsService = awsService;
    }
    async create(data, file) {
        let user = Object.assign({}, data);
        user.password = await bcrypt.hash(user.password, 10);
        const newUser = await this.userModel.create(Object.assign(Object.assign({}, user), { isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }));
        try {
            user["profilePicture"] = await this.awsService.ProfilePictureUpload(file);
        }
        catch (error) {
            console.log(`Failed to upload image file: ${error.message}`);
        }
        return await this.findOne(newUser._id);
    }
    async findAll() {
        return await this.userModel.find();
    }
    async findOne(_id) {
        return await this.userModel.findOne({ _id });
    }
    async findOneByEmail(email) {
        return await this.userModel.findOne({ email });
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('User')),
    __metadata("design:paramtypes", [mongoose_1.Model,
        aws_service_1.AwsService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map