import { Injectable } from '@nestjs/common';
import { CreateFavDto } from './dto/create-fav.dto';
import { UpdateFavDto } from './dto/update-fav.dto';
import { DatabaseService } from 'src/database/database.service';
import { Service } from './favs.controller';

@Injectable()
export class FavsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async create(service: Service, id: string) {
    return await this.databaseService.addFav(service, id);
  }

  async findAll() {
    return await this.databaseService.listFavs();
  }

  async remove(service: Service, id: string) {
    return await this.databaseService.removeFav(service, id);
  }
}
