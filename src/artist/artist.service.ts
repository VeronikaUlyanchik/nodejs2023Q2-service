import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ArtistService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createArtistDto: CreateArtistDto) {
    const artist =  await this.databaseService.createArtist({
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    });
    return artist;
  }

  async findAll() {
    return await this.databaseService.listArtists();
  }

  async findOne(id: string) {
    const res = await this.databaseService.getArtist(id);
    return res;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    return await this.databaseService.updateArtist(
      id,
      updateArtistDto.name,
      updateArtistDto.grammy,
    );
  }

  async remove(id: string) {
    return await this.databaseService.deleteArtist(id);
  }
}
