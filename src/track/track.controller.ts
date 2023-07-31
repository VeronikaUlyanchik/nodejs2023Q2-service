import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, NotFoundException, Put, HttpCode } from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.trackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = this.trackService.findOne(id);
    if(!track) {
      throw new NotFoundException();
    }
    return track;
  }

  @Put(':id')
  update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateTrackDto: UpdateTrackDto) {
    const track =  this.findOne(id);
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const track =  this.findOne(id);
    return this.trackService.remove(id);
  }
}
