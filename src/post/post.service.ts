import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entity';
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

    async getOne( id: number, author?: User){
        const post = await this.postRepository.findOne(id)
        .then(u=> (!author ? u : !!u 
            && author.id === u.id ? u : null) )
        if(!post) throw new NotFoundException('El Post no Existe')
        return post;
    }


    async createOne( dto: CreatePostDto, author: User){
         const post = this.postRepository.create({...dto, author})
        return await this.postRepository.save(post) 
    }

    
    async editOne(id : number, dto: EditPostDto, author?: User){
        const post = await this.getOne(id, author)
        const editpost = Object.assign(post, dto)
        return await this.postRepository.save(editpost)
    }

    async deleteOne(id : number, author?: User){
        const post = await this.getOne(id, author)
        return await this.postRepository.remove(post)
    }
}
