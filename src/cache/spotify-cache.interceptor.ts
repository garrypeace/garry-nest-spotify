import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SpotifyService } from 'src/spotify/spotify.service';

export interface Response<T> {
  data: T;
}

@Injectable()
export class SpotifyCacheInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private spotifyService: SpotifyService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    console.log(context.getArgs()[0]['_parsedUrl']);

    this.spotifyService
      .getToken()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });

    return next.handle().pipe(map((data) => ({ data })));
  }
}
