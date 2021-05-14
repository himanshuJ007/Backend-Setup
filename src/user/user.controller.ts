import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import {CreateUserDto} from "./userDto/creaateUserDto";
import {UpdateUserDto} from "./userDto/updateUserDto";
import {UserService} from "./user.service";
import { User } from './interface/user.interface'

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {
    }
    @Get()
    findAll(): User[] {
        return this.userService.findAll();;
    }

    @Get(':id')
    findOne(@Param('id') id: string): string {
        return `This action returns a #${id} user`;
    }

    @Post()
    async create(@Body() createCatDto: CreateUserDto) {
        return this.userService.create(createCatDto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateCatDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes a #${id} user`;
    }


}
