import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ArtistService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createArtistDto: CreateArtistDto) {
    const artist = this.databaseService.createArtist({
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });
    return artist;
  }

  findAll() {
    return this.databaseService.listArtists();
  }

  findOne(id: string) {
    return this.databaseService.getArtist(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.databaseService.updateArtist(
      id,
      updateArtistDto.name,
      updateArtistDto.grammy,
    );
  }

  remove(id: string) {
    return this.databaseService.deleteArtist(id);
  }
}
