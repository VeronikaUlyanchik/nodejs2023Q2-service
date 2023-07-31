import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  controllers: [FavsController],
  providers: [FavsService, DatabaseService],
  imports: [DatabaseService],
})
export class FavsModule {}
