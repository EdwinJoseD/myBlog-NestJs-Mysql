import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcryptjs'
import { User } from '../user/entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly userServices: UserService,
        private readonly jwtService: JwtService){}

    async validateUser(email:string, password: string): Promise<any>{

        const user = await this.userServices.getEmail({email})

        if(user && await compare(password, user.password)){
            const {password, ...rest} = user
            return rest}

        return null;
    }

    async login(user: User){
        const {id, ...rest} = user

        const payload = {user: id}

        return {
            user,
            accessToken: await this.jwtService.sign(payload)
        }
    }
}
