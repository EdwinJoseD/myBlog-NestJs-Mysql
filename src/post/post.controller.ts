import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/common/decorators';
import { CreatePostDto, EditPostDto } from './dtos/index';
import { PostService } from './post.service';

@ApiTags('Modulo Post')
@Controller('post')
export class PostController {

    constructor(private readonly postService: PostService) {}

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

    @Auth()
    @Post()
    async createOne(
        @Body() dto: CreatePostDto){
       const data = await this.postService.createOne(dto) 
            return { Message: 'Post Creado', data}
    }

    @Auth()
    @Patch(':id')
    async editOne(
        @Param('id', ParseIntPipe) id : number,
        @Body() dto: EditPostDto){
        
        const post = await this.postService.editOne(id, dto)
        return { Message: 'Post editado', post}
    }

    @Auth()
    @Delete(':id')
    async deleteOne(@Param('id', ParseIntPipe) id: number){
        const data =  await this.postService.deleteOne(id)
        return { Message: 'Post Eliminado', data} 
    }

}
