import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthLoginModel } from '../models/auth-login.model';
import { AuthService } from '../services/auth.service';
import { ApiCreatedResponse, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';

@Controller('api/auth')
@ApiTags('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('sign-in')
    @ApiCreatedResponse({ description: 'User finded successfully.' })
    @ApiUnprocessableEntityResponse({ description: 'User not found.' })
    signIn(@Body() authLoginModel: AuthLoginModel) {
        return this.authService.signIn(authLoginModel);
    }

    @HttpCode(HttpStatus.OK)
    @Post('sign-up')
    @ApiCreatedResponse({ description: 'User created successfully.' })
    @ApiUnprocessableEntityResponse({ description: 'User email already exists.' })
    signUp(@Body() authLoginModel: AuthLoginModel) {
        return this.authService.signUp(authLoginModel);
    }
}
