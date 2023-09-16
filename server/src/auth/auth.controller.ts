import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {AdminLoginAuthDto} from "./dto/admin-login-auth.dto";

@Controller('auth-admin')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post('login')
    login(@Body() adminLoginAuthDto: AdminLoginAuthDto) {
        return this.authService.login(adminLoginAuthDto);
    }

}
