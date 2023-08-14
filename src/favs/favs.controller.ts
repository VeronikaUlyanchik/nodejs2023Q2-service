import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  ParseEnumPipe,
  UnprocessableEntityException,
  HttpCode,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { CreateFavDto } from './dto/create-fav.dto';
import { UpdateFavDto } from './dto/update-fav.dto';

export enum Service {
  track = 'track',
  album = 'album',
  artist = 'artist',
}

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Post('/:service/:id')
  create(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('service', new ParseEnumPipe(Service)) service: Service,
  ) {
    const fav = this.favsService.create(service, id);
    if (!fav) {
      throw new UnprocessableEntityException();
    }
    return fav;
  }

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Delete('/:service/:id')
  @HttpCode(204)
  remove(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Param('service', new ParseEnumPipe(Service)) service: Service,
  ) {
    const fav = this.favsService.remove(service, id);
    if (!fav) {
      throw new UnprocessableEntityException();
    }
    return fav;
  }
}
