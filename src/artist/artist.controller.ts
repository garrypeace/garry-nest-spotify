import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistCacheInterceptor } from 'src/cache/artist-cache.interceptor';

@Controller('artist')
@UseInterceptors(ArtistCacheInterceptor)
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.artistService.findOne(id);
  }
}
