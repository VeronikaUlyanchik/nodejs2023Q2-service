import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.databaseService.createUser({
      login: createUserDto.login,
      password: createUserDto.password,
    });
    return user;
  }

  async findAll() {
    const users = await this.databaseService.listUsers();
    return users;
  }

  async findOne(id: string) {
    const user = await this.databaseService.getUser(id);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.databaseService.updateUser(
      id,
      updateUserDto.oldPassword,
      updateUserDto.newPassword,
    );
    return user;
  }

  async remove(id: string) {

    const user = await this.databaseService.removeUser(id);
    return user;
  }
}
