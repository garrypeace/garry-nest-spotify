import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @ApiProperty({ type: String, required: true })
  id: string;

  @ApiProperty({ type: String, required: true })
  name: string;

  @ApiProperty({ type: Number, required: false })
  followers: number;

  @ApiProperty({ type: Number, required: false })
  popularity: number;
}
