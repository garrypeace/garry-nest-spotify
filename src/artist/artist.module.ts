import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { SpotifyCacheInterceptor } from 'src/cache/spotify-cache.interceptor';
import { SpotifyService } from 'src/spotify/spotify.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ArtistController],
  providers: [ArtistService, SpotifyService],
})
export class ArtistModule {}
