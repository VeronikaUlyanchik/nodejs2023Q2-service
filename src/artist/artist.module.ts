import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { DatabaseService } from 'src/database/database.service';

@Module({
  imports:[DatabaseService],
  controllers: [ArtistController],
  providers: [ArtistService, DatabaseService],
})
export class ArtistModule {}
