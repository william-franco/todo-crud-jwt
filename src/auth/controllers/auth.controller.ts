import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthLoginModel } from '../models/auth-login.model';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('sign-in')
    signIn(@Body() authLoginModel: AuthLoginModel) {
        return this.authService.signIn(authLoginModel);
    }

    @HttpCode(HttpStatus.OK)
    @Post('sign-up')
    signUp(@Body() authLoginModel: AuthLoginModel) {
        return this.authService.signUp(authLoginModel);
    }
}
