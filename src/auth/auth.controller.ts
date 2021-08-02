import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User as UserEntity } from 'src/user/entity';
import { User } from '../common/decorators';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard';
import { Auth } from '../common/decorators'
import { LoginDto } from './dtos';

@ApiTags('Autenticacion')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
        @Body() login: LoginDto,
        @User() user : UserEntity
    ) {
        const data = await this.authService.login(user)
        return {
            Message: 'Login Exitoso',
            data
        }
    }

    @Auth()
    @Get('profile')
    async profile(
        @User() user: UserEntity
    ) { 
        return {
            Message: 'Perfil del usuario',
            user
        }
    }

    @Auth()
    @Get('refresh')
    async refresh(
        @User() user : UserEntity
    ) {
        const data = await this.authService.login(user)
        return {
            Message: 'refresh exitoso',
            data
        }
    }
}
