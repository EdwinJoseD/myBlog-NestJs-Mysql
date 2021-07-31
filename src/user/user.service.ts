import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, EditUserDto } from './dtos';
import { User } from './entity'


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async getMany(): Promise<User[]>{
        return await this.userRepository.find()
    }

    async getOne(id:number) {
        const user = await this.userRepository.findOne(id)
        if(!user) throw new NotFoundException('Usuario no Existe')
        return user;
    }

    async createOne(dto: CreateUserDto){
        const useExist = await this.userRepository.findOne({email: dto.email})
        if(useExist) throw new BadRequestException('Este Usuario ya existe')
        const user = await this.userRepository.create(dto)
        const userSaved = await this.userRepository.save(user)
        delete userSaved.password;
        return userSaved;
    }

    async editOne(id: number, dto : EditUserDto){
        const user = await this.getOne(id)

        const userEdit = Object.assign(user, dto)
        return await this.userRepository.save(userEdit)
    }

    async deleteOne(id: number){
        const user = await this.getOne(id)
        return await this.userRepository.remove(user)
    }
}
