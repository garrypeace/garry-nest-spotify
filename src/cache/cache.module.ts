import { Module } from '@nestjs/common';
import { ArtistsCacheService } from './artists-cache.service';
import { SpotifyService } from 'src/spotify/spotify.service';
import { ArtistsService } from 'src/artist/artists.service';
import { SpotifyModule } from 'src/spotify/spotify.module';
import { ArtistsModule } from 'src/artist/artists.module';
import { ArtistsCacheInterceptor } from './artists-cache.interceptor';

@Module({
  imports: [SpotifyModule, ArtistsModule],
  exports: [ArtistsCacheService],
})
export class CacheModule {}
