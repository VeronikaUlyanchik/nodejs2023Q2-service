import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseService } from 'src/database/database.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [DatabaseService, PassportModule.register({ defaultStrategy: 'jwt' })], 
  controllers: [UserController],
  providers: [UserService, DatabaseService],
  exports: [UserService], 
})
export class UserModule {}
