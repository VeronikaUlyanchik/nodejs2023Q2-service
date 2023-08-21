import { Injectable, Dependencies, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService ){}

  async signIn(username, pass) {
    const user = await this.userService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(username: string, pass: string) {
    let user = null;
    console.log(username, 'username')
    console.log(process.env)
   
    const hash = await bcrypt.hash(pass, 10)
        user = await this.userService.create({
            login: username, password: hash,
  })
   
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: await this.jwtService.signAsync(payload, {secret: process.env.JWT_SECRET_KEY}),
    };
  }
}
