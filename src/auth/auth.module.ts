import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy, LocalStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JWT_SECRET_KEY } from '../config';

@Module({
 imports:[
   PassportModule.register({
     defaultStrategy: 'jwt'
   }),
   JwtModule.registerAsync({
     inject:[ConfigService],
     useFactory: (config: ConfigService)=>({
     secret: config.get<string>(JWT_SECRET_KEY),
     signOptions: { expiresIn: '60M'}
     })
   }),
   UserModule
 ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
