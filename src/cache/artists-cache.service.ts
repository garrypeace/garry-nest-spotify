import { BadRequestException, Injectable } from '@nestjs/common';
import { ArtistsService } from 'src/artist/artists.service';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { SpotifyService } from 'src/spotify/spotify.service';

@Injectable()
export class ArtistsCacheService {
  constructor(
    private artistsService: ArtistsService,
    private spotifyService: SpotifyService,
  ) {}

  async isCachedInDatabase(artistId: string): Promise<boolean> {
    const result = await this.artistsService.findOne(artistId);
    return result ? true : false;
  }

  async process(artistId: string) {
    let result;
    const isCached = await this.isCachedInDatabase(artistId);

    if (isCached) {
      console.log('Getting from database');
      result = this.artistsService.findOne(artistId);
    } else {
      console.log('Getting from Spotify');

      let apiResult;
      try {
        apiResult = await this.spotifyService.getArtistById(artistId);
      } catch (error) {
        const message = error.request.res.statusMessage ?? '?';
        const code = error.request.res.statusCode ?? '?';
        const url = error.request.res.responseUrl ?? '?';
        const errorMessage = `Spotify returned ${code} ${message} for ${url}`;

        console.error(errorMessage);
        throw new BadRequestException(errorMessage);
        return;
      }

      console.log('Creating new artist...');
      const newArtist = new CreateArtistDto();
      newArtist.id = apiResult.data['id'];
      newArtist.name = apiResult.data['name'];
      newArtist.followers = apiResult.data['followers']['total'];
      newArtist.popularity = apiResult.data['popularity'];
      await this.artistsService.create(newArtist);
    }
  }
}
