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
import { AlbumModule } from './album/album.module';
import { AlbumController } from './album/album.controller';
import { AlbumService } from './album/album.service';
import { FavsModule } from './favs/favs.module';
import { FavsController } from './favs/favs.controller';
import { FavsService } from './favs/favs.service';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    TrackModule,
    ArtistModule,
    AlbumModule,
    FavsModule,
  ],
  controllers: [
    AppController,
    UserController,
    TrackController,
    ArtistController,
    AlbumController,
    FavsController,
  ],
  providers: [
    AppService,
    DatabaseService,
    UserService,
    TrackService,
    ArtistService,
    AlbumService,
    FavsService,
  ],
  exports: [DatabaseModule],
})
export class AppModule {}
