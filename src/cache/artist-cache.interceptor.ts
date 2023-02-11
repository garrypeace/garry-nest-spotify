import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SpotifyService } from 'src/spotify/spotify.service';
import { ArtistCacheService } from './artist-cache.service';
import { ArtistService } from 'src/artist/artist.service';
import { CreateArtistDto } from 'src/artist/dto/create-artist.dto';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ArtistCacheInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(
    private artistCacheService: ArtistCacheService,
    private spotifyService: SpotifyService,
    private artistService: ArtistService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Response<T>>> {
    const artistId = context.getArgs()[0].params?.id;

    let result;

    const isCached = await this.artistCacheService.isCachedInDatabase(artistId);

    console.log(isCached);

    if (isCached) {
      console.log('Getting from database');
      result = this.artistService.findOne(artistId);
    } else {
      console.log('Getting from Spotify');

      let result = await this.spotifyService.getArtistById(artistId);
      console.log(result);

      const newArtist = new CreateArtistDto();
      newArtist.id = result.data['id'];
      newArtist.name = result.data['name'];
      await this.artistService.create(newArtist);
    }

    // continue with original call
    return next.handle().pipe(map((data) => ({ data })));
  }
}
