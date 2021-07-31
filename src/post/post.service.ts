import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto, EditPostDto } from './dtos';
import { Post } from './entity'

@Injectable()
export class PostService {

    constructor(
        @InjectRepository(Post)
        private readonly postRepository : Repository<Post>) {}

    async getMany(): Promise<Post[]>{
        return await this.postRepository.find();
    }

    async getOne( id: number){
        const post = await this.postRepository.findOne(id);
        if(!post) throw new NotFoundException('El Post no Existe')
        return post;
    }


    async createOne( dto: CreatePostDto){
        const post = this.postRepository.create(dto as any)
        return await this.postRepository.save(post)
    }

    
    async editOne(id : number, dto: EditPostDto){
        const post = await this.getOne(id)
        const editpost = Object.assign(post, dto)
        return await this.postRepository.save(editpost)
    }

    async deleteOne(id : number){
        const post = await this.getOne(id)
        return await this.postRepository.remove(post)
    }
}
