import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AlbumService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createAlbumDto: CreateAlbumDto) {
    return this.databaseService.createAlbum(createAlbumDto);
  }

  findAll() {
    return this.databaseService.listAlbums();
  }

  findOne(id: string) {
    return this.databaseService.getAlbum(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.databaseService.updateAlbum(id, updateAlbumDto);
  }

  remove(id: string) {
    return this.databaseService.deleteAlbum(id);
  }
}
