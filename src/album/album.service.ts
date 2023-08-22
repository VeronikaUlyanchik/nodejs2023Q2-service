import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AlbumService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(createAlbumDto: CreateAlbumDto) {
    return await this.databaseService.createAlbum(createAlbumDto);
  }

  async findAll() {
    return await this.databaseService.listAlbums();
  }

  async findOne(id: string) {
    return await this.databaseService.getAlbum(id);
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return await this.databaseService.updateAlbum(id, updateAlbumDto);
  }

  async remove(id: string) {
    return await this.databaseService.deleteAlbum(id);
  }
}
