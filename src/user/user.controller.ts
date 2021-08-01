import { Body, Controller, Get, Param, ParseIntPipe, Post, Delete, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { AppResource } from 'src/app.routes';
import { Auth, User } from '../common/decorators';
import { CreateUserDto, EditUserDto } from './dtos';
import { User as userEntity} from './entity';
import { UserService } from './user.service';

@ApiTags('Usuarios')
@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder){}

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

    @Auth({
        possession: 'any',
        action: 'create',
        resource: AppResource.USER
    })
    @Post()
    async createOne(
        @Body() dto: CreateUserDto){
       const data = await this.userService.createOne(dto) 
            return { Message: 'Usuario Creado', data}
    }

    @Auth({
        possession: 'own',
        action: 'update',
        resource: AppResource.USER
    })
    @Patch(':id')
    async editOne(
        @Param('id', ParseIntPipe) id : number,
        @Body() dto: EditUserDto,
        @User()user: userEntity){
            let post;
        if(this.rolesBuilder
            .can(user.roles)
            .updateAny(AppResource.USER)
            .granted
        ){
        //admin
            post = await this.userService.editOne(id, dto)
        }else{
            //autor
            
            const {roles, ...rest} = dto;
            post = await this.userService.editOne(id, rest, user)
        }
        return { Message: 'Usuario editado', post}
    }

    @Auth({
        possession: 'own',
        action: 'delete',
        resource: AppResource.USER
    })
    @Delete(':id')
    async deleteOne(
        @Param('id', ParseIntPipe) id: number,
        @User()user: userEntity){
            let data;
            if(this.rolesBuilder
                .can(user.roles)
                .updateAny(AppResource.USER)
                .granted
            ){
                data =  await this.userService.deleteOne(id)
            }else{
                data =  await this.userService.deleteOne(id, user)
            }
        
        return { Message: 'usuario Eliminado', data} 
    }
}
