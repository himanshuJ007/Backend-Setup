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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
const common_1 = require("@nestjs/common");
const authentication_service_1 = require("./authentication.service");
const login_1 = require("./Dto/login");
const jwt_1 = require("@nestjs/jwt");
const register_1 = require("./Dto/register");
const user_service_1 = require("../user/user.service");
const platform_express_1 = require("@nestjs/platform-express");
const config_1 = require("@nestjs/config");
const dotenv = require("dotenv");
dotenv.config({ path: '.development.env' });
let AuthenticationController = class AuthenticationController {
    constructor(authenticateService, userService, jwtService, configService) {
        this.authenticateService = authenticateService;
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async login(payload) {
        console.log(process.env.JWT_SECRET);
        const user = await this.authenticateService.validateUser(payload.email, payload.password);
        if (user) {
            return {
                access_token: this.jwtService.sign({ username: payload.email, sub: user._id }),
                message: 'SuccessFully LoggedIn . . .'
            };
        }
        else {
            return {
                message: 'LOGIN Failed . . .'
            };
        }
    }
    async register(payload, file) {
        const oldUser = await this.userService.findOneByEmail(payload.email);
        if (oldUser) {
            return {
                message: ' User Already Exists with this email'
            };
        }
        else {
            const newUser = await this.userService.create(payload, file);
            const { password } = newUser, user = __rest(newUser, ["password"]);
            return {
                user: user,
                message: 'User Successfully Registered'
            };
        }
    }
};
__decorate([
    common_1.Get('login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_1.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "login", null);
__decorate([
    common_1.Post('register'),
    common_1.UseInterceptors(platform_express_1.FileInterceptor('file')),
    __param(0, common_1.Body()), __param(1, common_1.UploadedFile()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_1.RegisterDto, Object]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "register", null);
AuthenticationController = __decorate([
    common_1.Controller('authentication'),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService,
        user_service_1.UserService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthenticationController);
exports.AuthenticationController = AuthenticationController;
//# sourceMappingURL=authentication.controller.js.map