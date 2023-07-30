import { IsString, IsNotEmpty, IsBoolean } from "class-validator";

export class CreateArtistDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsBoolean()
    grammy: boolean;
}
