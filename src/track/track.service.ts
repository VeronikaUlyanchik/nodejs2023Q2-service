import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TrackService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createTrackDto: CreateTrackDto) {
    return await this.databaseService.createTrack({
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    });
  }

  async findAll() {
    return await this.databaseService.listTracks();
  }

  async findOne(id: string) {
    return await this.databaseService.getTrack(id);
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    return await this.databaseService.updateTrack(id, updateTrackDto);
  }

  async remove(id: string) {
    return await this.databaseService.deleteTrack(id);
  }
}
