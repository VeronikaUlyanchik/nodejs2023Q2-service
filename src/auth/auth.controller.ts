import {
    Body,
    Controller,
    Global,
    HttpCode,
    HttpStatus,
    Post,
    UseGuards,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { SignUpDto } from './dto/singup.dto';

  @Global()
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @HttpCode(HttpStatus.OK)
    @Post('login')
    @UseGuards(AuthGuard)
    signIn(@Body() signInDto: Record<string, any>) {
      return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    signUp(@Body() signUpDto: SignUpDto) {
      return this.authService.signUp(signUpDto.login, signUpDto.password);
    }
  }
