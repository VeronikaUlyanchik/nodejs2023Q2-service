
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import * as dotenv from 'dotenv';
dotenv.config();

console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);
console.log('TOKEN_EXPIRE_TIME:', process.env.TOKEN_EXPIRE_TIME);

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.TOKEN_EXPIRE_TIME },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}