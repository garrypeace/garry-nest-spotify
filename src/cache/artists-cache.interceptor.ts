import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ArtistsCacheService } from './artists-cache.service';

export interface Response<T> {
  data: T;
}

@Injectable()
export class ArtistsCacheInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private artistsCacheService: ArtistsCacheService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Response<T>>> {
    const artistId = context.getArgs()[0].params?.id;
    await this.artistsCacheService.process(artistId);

    // continue with original call
    return next.handle().pipe(map((data) => ({ data })));
  }
}
