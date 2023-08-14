import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TrackService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createTrackDto: CreateTrackDto) {
    return this.databaseService.createTrack({
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    });
  }

  findAll() {
    return this.databaseService.listTracks();
  }

  findOne(id: string) {
    return this.databaseService.getTrack(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.databaseService.updateTrack(id, updateTrackDto);
  }

  remove(id: string) {
    return this.databaseService.deleteTrack(id);
  }
}
