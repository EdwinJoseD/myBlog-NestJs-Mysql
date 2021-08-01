import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User as UserEntity } from 'src/user/entity';
import { User } from '../common/decorators';
import { AuthService } from './auth.service';
import { JwtAuthGuard, LocalAuthGuard } from './guard';
import { Auth } from '../common/decorators'

@ApiTags('Autenticacion')
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(
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
