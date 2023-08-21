import { Injectable, Dependencies, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

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
   
    bcrypt.hash(pass, process.env.CRYPT_SALT, async function(err, hash) {
        if(err) {
            return null
        }
        user = await this.userService.create({
            login: username, password: hash,
        })
    });
    console.log(user)
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
