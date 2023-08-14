import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createUserDto: CreateUserDto) {
    const user = this.databaseService.createUser({
      login: createUserDto.login,
      password: createUserDto.password,
    });
    return user;
  }

  findAll() {
    const users = this.databaseService.listUsers();
    return users;
  }

  findOne(id: string) {
    const user = this.databaseService.getUser(id);
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.databaseService.updateUser(
      id,
      updateUserDto.oldPassword,
      updateUserDto.newPassword,
    );
    return user;
  }

  remove(id: string) {
    const user = this.databaseService.removeUser(id);
    return user;
  }
}
