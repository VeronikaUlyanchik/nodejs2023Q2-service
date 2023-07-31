import { Injectable } from '@nestjs/common';
import { CreateFavDto } from './dto/create-fav.dto';
import { UpdateFavDto } from './dto/update-fav.dto';
import { DatabaseService } from 'src/database/database.service';
import { Service } from './favs.controller';

@Injectable()
export class FavsService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(service: Service, id: string) {
    return this.databaseService.addFav(service, id);
  }

  findAll() {
    return this.databaseService.listFavs();
  }

  remove(service: Service, id: string) {
    return this.databaseService.removeFav(service, id);
  }
}
