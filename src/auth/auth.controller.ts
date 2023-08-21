import {
    Body,
    Controller,
    Global,
    HttpCode,
    HttpStatus,
    Post,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';

  @Global()
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
      return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    signUp(@Body() signUpDto: Record<string, any>) {
      return this.authService.signUp(signUpDto.username, signUpDto.password);
    }
  }
