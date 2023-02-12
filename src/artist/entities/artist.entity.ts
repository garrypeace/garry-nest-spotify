import { ApiProperty } from '@nestjs/swagger';
import { Artist } from '@prisma/client';

export class ArtistEntity implements Artist {
  @ApiProperty()
  id: string;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty()
  followers: number;

  @ApiProperty()
  popularity: number;
}
