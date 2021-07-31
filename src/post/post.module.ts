import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { Post } from './entity';
import { PostService } from './post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post])
  ],
  controllers: [PostController],
  providers: [PostService],
  exports:[TypeOrmModule.forFeature([Post])]
})
export class PostModule {}
