import {  IsArray, IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'
import { PostCategory } from '../enums/index'
import  { EnumToString } from '../../common/helpers'

export class CreatePostDto{

    @IsString()
    title: string;
  
    @IsString()
    slug: string;
  
    @IsString()
    excerpt: string;
  
    @IsString()
    content: string;
  
    @IsNotEmpty()
    @IsEnum(PostCategory, {
      message: `Invalid option. Valids options are ${EnumToString(PostCategory)}`,
    })
    category: string;
  
    @IsString({ each: true })
    @IsArray()
    tags: string[];
  
    @IsOptional()
    @IsBoolean()
    status: boolean;
}