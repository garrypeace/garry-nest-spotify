import { Injectable } from '@nestjs/common';
import { ArtistService } from 'src/artist/artist.service';

@Injectable()
export class ArtistCacheService {
  constructor(private artistService: ArtistService) {}

  async isCachedInDatabase(artistId: string) {
    return await this.artistService.findOne(artistId);
  }
}
