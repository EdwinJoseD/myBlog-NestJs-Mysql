import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, EditUserDto } from './dtos';
import { User } from './entity'
import { IUserFindOne } from './inteface';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    async getMany(): Promise<User[]>{
        return await this.userRepository.find()
    }

    async getOne(id:number, userEntity?: User) {
        const user = await this.userRepository.findOne(id)
        .then(u=> (!userEntity ? u : !!u 
            && userEntity.id === u.id ? u : null) )

        if(!user) throw new NotFoundException('Usuario no Existe o no estas Autorizado')
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

    async editOne(id: number, dto : EditUserDto, userEntity?: User){
        const user = await this.getOne(id, userEntity)

        const userEdit = Object.assign(user, dto)
        return await this.userRepository.save(userEdit)
    }

    async deleteOne(id: number, userEntity?: User){
        const user = await this.getOne(id, userEntity)
        return await this.userRepository.remove(user)
    }

    async getEmail(data: IUserFindOne){
        return await this.userRepository
        .createQueryBuilder('user')
        .where(data)
        .addSelect('user.password')
        .getOne()    
    }
}
