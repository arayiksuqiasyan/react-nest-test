import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {MongooseModule} from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import {JwtModule} from "@nestjs/jwt";

@Module({
    imports: [
        ConfigModule.forRoot({isGlobal: true}),
        MongooseModule.forRootAsync({
            useFactory: (config) => {
                return {
                    uri: config.get('MONGO_URL'),
                };
            },
            inject: [ConfigService],
        }),
        JwtModule.registerAsync({
            useFactory: (config) => {
                return {
                    secret: config.get('JWT_SECRET'),
                    signOptions: { expiresIn: '60s' },
                };
            },
            inject: [ConfigService],
        }),
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
    exports:[JwtModule]
})
export class AppModule {
}
