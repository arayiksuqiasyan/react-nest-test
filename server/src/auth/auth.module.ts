import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from "./auth.controller";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./jwt.strategy";
import {JwtModule} from "@nestjs/jwt";
import {MongooseModule} from "@nestjs/mongoose";
import {AdminUser, AdminUserSchema} from "./auth.schemas";

@Module({
    imports: [
        JwtModule,
        PassportModule,
        MongooseModule.forFeature([{name: AdminUser.name, schema: AdminUserSchema}])
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {
}
