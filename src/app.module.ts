import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from './config/constanst'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService)=> ({
        type: 'mysql',
        host: config.get<string>(DB_HOST),
        port: parseInt(config.get<string>(DB_PORT), 10),
        username: config.get<string>(DB_USERNAME),
        password: config.get<string>(DB_PASSWORD),
        database: config.get<string>(DB_NAME),
        entities: ["dist/**/**.entity{.ts,.js}"],
        synchronize: true,
      })
    }),
    PostModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
