import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreatePostDto, EditPostDto } from './dtos/index';

@Controller('post')
export class PostController {

    @Get()
    getMany(){
        return {
            Message : 'Lista de Post',
            data: []
        };
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number){
        console.log(typeof id)
        return {
            Message: 'Post '+id,
            data: []
        }
    }


    @Post()
    createOne(@Body() dto: CreatePostDto){
        return dto;
    }

    @Patch(':id')
    editOne(
        @Param('id', ParseIntPipe) id : number,
        @Body() dto: EditPostDto){
        return dto;

    }

    @Delete(':id')
    deleteOne(){
        return {
            Message: 'Eliminado'
        };
    }

}
