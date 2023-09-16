import {Injectable, NotFoundException} from '@nestjs/common';
import {Model} from "mongoose";
import {JwtService} from "@nestjs/jwt";
import {InjectModel} from "@nestjs/mongoose";
import {ConfigService} from "@nestjs/config";

import {AdminUser} from "./auth.schemas";
import {AdminLoginAuthDto} from "./dto/admin-login-auth.dto";

const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService,
        @InjectModel(AdminUser.name) private adminUserModel: Model<AdminLoginAuthDto>,
    ) {
    }

    async login(adminLoginAuthDto: AdminLoginAuthDto) {
        const user = await this.adminUserModel
            .findOne({login: adminLoginAuthDto.login})
            .exec();

        if(!user){
            throw new NotFoundException({success: false,message:'Admin not found'});
        }

        const detected = await bcrypt.compare(
            adminLoginAuthDto?.password,
            user?.password,
        );

        if (!detected) {
            throw new NotFoundException({success: false});
        }

        const token = this.jwtService.sign(
            {userId: user.id},
            {secret: this.configService.get('JWT_SECRET')},
        );
        return {token};
    }

}
