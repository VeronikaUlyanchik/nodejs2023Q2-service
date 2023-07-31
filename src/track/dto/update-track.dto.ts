import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
    @IsString()
    name: string;

    @IsString()
    artistId: string;
    @IsString()
    albumId: string;
    
    @IsNumber()
    duration: number;
}
