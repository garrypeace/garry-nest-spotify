import { Injectable } from '@nestjs/common';
import { ArtistsService } from 'src/artist/artists.service';

@Injectable()
export class ArtistsCacheService {
  constructor(private artistsService: ArtistsService) {}

  async isCachedInDatabase(artistId: string): Promise<boolean> {
    const result = await this.artistsService.findOne(artistId);
    return result ? true : false;
  }
}
