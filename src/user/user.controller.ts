import { Body, Controller, Get, Param, ParseIntPipe, Post, Delete, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, EditUserDto } from './dtos';
import { UserService } from './user.service';

@ApiTags('Usuarios')
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @Get()
    async getMany(){
        const users = await this.userService.getMany()
        return {
            Message: 'Lista de Ususarios',
            users
        }
    }

    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id : number){
        const user = await this.userService.getOne(id)
        return {
            Message: 'Ususario',
            user
        }
    }

    @Post()
    async createOne(
        @Body() dto: CreateUserDto){
       const data = await this.userService.createOne(dto) 
            return { Message: 'Usuario Creado', data}
    }

    @Patch(':id')
    async editOne(
        @Param('id', ParseIntPipe) id : number,
        @Body() dto: EditUserDto){
        
        const post = await this.userService.editOne(id, dto)
        return { Message: 'Usuario editado', post}
    }

    @Delete(':id')
    async deleteOne(@Param('id', ParseIntPipe) id: number){
        const data =  await this.userService.deleteOne(id)
        return { Message: 'usuario Eliminado', data} 
    }
}
