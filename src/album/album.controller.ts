import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Put, NotFoundException, HttpCode } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = this.albumService.findOne(id);
    if(!album) {
      throw new NotFoundException();
    }
    return album;
  }

  @Put(':id')
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    const album = this.findOne(id);
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = this.findOne(id);
    return this.albumService.remove(id);
  }
}
