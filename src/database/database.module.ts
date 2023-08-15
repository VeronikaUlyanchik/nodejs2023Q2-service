import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService, PrismaService],
  imports: [PrismaService],
})
export class DatabaseModule {}
