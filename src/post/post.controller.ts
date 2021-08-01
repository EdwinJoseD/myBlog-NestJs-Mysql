import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRolesBuilder, RolesBuilder } from 'nest-access-control';
import { AppResource } from 'src/app.routes';
import { Auth } from 'src/common/decorators';
import { User as userEntity } from 'src/user/entity';
import { User } from '../common/decorators'
import { CreatePostDto, EditPostDto } from './dtos/index';
import { PostService } from './post.service';

@ApiTags('Modulo Post')
@Controller('post')
export class PostController {

    constructor(private readonly postService: PostService,
        @InjectRolesBuilder()
        private readonly rolesBuilder: RolesBuilder) {}

    @Get()
    async getMany(){
        const posts = await this.postService.getMany()
        return {
            Message : 'Lista de Post',
            posts
        };
    }

    @Get(':id')
    async getOne(
        @Param('id', ParseIntPipe) id: number){
        const post = await this.postService.getOne(id)
        return {
            Message: 'Post '+id,
            post
        }
    }

    @Auth({
        resource: AppResource.POST,
        action: 'create',
        possession: 'own',
      })
    @Post()
    async createOne(
        @Body() dto: CreatePostDto, 
        @User()author: userEntity){
       const data = await this.postService.createOne(dto, author) 
            return { Message: 'Post Creado', data}
    }

    @Auth({
        resource: AppResource.POST,
        action: 'update',
        possession: 'own',
      })
    @Patch(':id')
    async editOne(
        @Param('id', ParseIntPipe) id : number,
        @Body() dto: EditPostDto,
        @User() author : userEntity){
            let data;

            if (
              this.rolesBuilder.can(author.roles).updateAny(AppResource.POST).granted
            ) {
              // Puede editar cualquier POST...
              data = await this.postService.editOne(id, dto);
            } else {
              // Puede editar solo los propios...
              data = await this.postService.editOne(id, dto, author);
            }
        
            return { message: 'Post esitado', data };
    }

    @Auth({
        resource: AppResource.POST,
        action: 'delete',
        possession: 'own',
      })
    @Delete(':id')
    async deleteOne(@Param('id', ParseIntPipe) id: number, @User() author: userEntity){
        let data;

    if (
      this.rolesBuilder.can(author.roles).deleteAny(AppResource.POST).granted
    ) {
      data = await this.postService.deleteOne(id);
    } else {
      data = await this.postService.deleteOne(id, author);
    }
    return { message: 'Post Eliminado', data }; 
    }

}
