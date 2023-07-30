import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { UserController } from './user/user.controller';
import { DatabaseService } from './database/database.service';
import { UserService } from './user/user.service';

@Module({
  imports: [UserModule, DatabaseModule],
  controllers: [AppController, UserController],
  providers: [AppService, DatabaseService, UserService],
  exports: [DatabaseModule]
})
export class AppModule {}
