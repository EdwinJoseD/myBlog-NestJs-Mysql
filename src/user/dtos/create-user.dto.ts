import {
    IsString,
    IsEmail,
    MinLength,
    MaxLength,
    IsOptional,
    IsArray,
    IsEnum,
  } from 'class-validator';
  import { AppRoles } from '../../app.routes';
  import { EnumToString } from '../../common/helpers';
  
  export class CreateUserDto {
    @IsOptional()
    @IsString()
    @MaxLength(255)
    name: string;
  
    @IsOptional()
    @IsString()
    @MaxLength(255)
    lastName: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(8)
    @MaxLength(128)
    password: string;
  
     @IsArray()
    @IsEnum(AppRoles, {
      each: true,
      message: `Los roles validos son : , ${EnumToString(AppRoles)}`,
    })
    roles: string[]; 
  }