import {Controller, Get, Param, Post, Body, Put, Delete, UseGuards, SetMetadata, UseInterceptors, UploadedFile} from '@nestjs/common';
import {CreateUserDto} from "./Dto/creaateUserDto";
import {UpdateUserDto} from "./Dto/updateUserDto";
import {UserService} from "./user.service";
import { User } from './interface/user.interface'
import { RolesGuard} from "../roles.guard";
import  { AuthGuard } from "../auth.gaurd";
import {Roles} from "../roles.decorator";
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('user')
@UseGuards(RolesGuard,AuthGuard)
export class UserController {
    constructor(private userService: UserService) {
    }
    @Get()
    @Roles('admin','user')
    @UseGuards(RolesGuard)
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    @Roles('admin','user')
    findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(id);
    }

    @Post()
    @Roles('admin','user')
    @UseInterceptors(FileInterceptor('file'))
    async create(@Body() payload: CreateUserDto,@UploadedFile() file): Promise<User> {
        return this.userService.create(payload, file);
    }

    @Put(':id')
    @Roles('admin','user')
    update(@Param('id') id: string, @Body() updateCatDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    @Delete(':id')
    @Roles('admin','user')
    remove(@Param('id') id: string) {
        return `This action removes a #${id} user`;
    }
}
