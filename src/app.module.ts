import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import { UserController } from './user/user.controller';
import { DatabaseService } from './database/database.service';
import { UserService } from './user/user.service';
import { TrackModule } from './track/track.module';
import { TrackService } from './track/track.service';
import { TrackController } from './track/track.controller';
import { ArtistModule } from './artist/artist.module';
import { ArtistController } from './artist/artist.controller';
import { ArtistService } from './artist/artist.service';

@Module({
  imports: [UserModule, DatabaseModule, TrackModule, ArtistModule],
  controllers: [AppController, UserController, TrackController, ArtistController],
  providers: [AppService, DatabaseService, UserService, TrackService, ArtistService],
  exports: [DatabaseModule]
})
export class AppModule {}
