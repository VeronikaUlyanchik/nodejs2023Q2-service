import {
    Body,
    Controller,
    Global,
    HttpCode,
    HttpStatus,
    Post,
    SetMetadata,
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
    @SetMetadata('isPublic', true)
    signIn(@Body() signInDto: Record<string, any>) {
      return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('signup')
    @SetMetadata('isPublic', true)
    signUp(@Body() signUpDto: SignUpDto) {
      return this.authService.signUp(signUpDto.login, signUpDto.password);
    }
  }
