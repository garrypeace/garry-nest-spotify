import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SpotifyService } from 'src/spotify/spotify.service';
import { ArtistsCacheService } from './artists-cache.service';
import { ArtistsService } from 'src/artist/artists.service';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';
import { BadRequestException } from '@nestjs/common/exceptions';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ArtistsCacheInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(
    private artistsCacheService: ArtistsCacheService,
    private spotifyService: SpotifyService,
    private artistsService: ArtistsService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Response<T>>> {
    const artistId = context.getArgs()[0].params?.id;

    let result;
    const isCached = await this.artistsCacheService.isCachedInDatabase(
      artistId,
    );

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
      await this.artistsService.create(newArtist);
    }

    // continue with original call
    return next.handle().pipe(map((data) => ({ data })));
  }
}
