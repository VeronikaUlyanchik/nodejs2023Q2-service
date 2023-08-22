import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  login: string; // previous password

  @IsNotEmpty()
  @IsString()
  password: string; // new password
}
