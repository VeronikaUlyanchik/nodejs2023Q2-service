import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, NotFoundException, Put, ForbiddenException, HttpCode } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistService.findAll();
  }
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = this.artistService.findOne(id);
    if(!user) {
      throw new NotFoundException();
    }
    return this.artistService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateArtistDto: UpdateArtistDto) {
    const artist = this.findOne(id);
    const updated = this.artistService.update(id, updateArtistDto);
    return updated;
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = this.findOne(id);
    return this.artistService.remove(id);
  }
}
