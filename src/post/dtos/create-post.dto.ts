import {  IsArray, IsBoolean, IsEnum, IsString, Length } from 'class-validator'
import { PostCategory } from '../enums/index'
import  { EnumToString } from '../../common/helpers'

export class CreatePostDto{

    @IsString()
    @Length(5, 30)
    title: string

    @IsString()
    @Length(5, 20)
    slug: string

    @IsString()
    excerpt: string

    @IsString()
    content: string

    @IsEnum(PostCategory, {
        message: `Opcion invalida, las opciones correctas son ${EnumToString(PostCategory)}`
    })
    category: PostCategory

    @IsArray()
    @IsString({each:true})
    tags: string[]

    @IsBoolean()
    status: boolean
}