import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { SpotifyService } from 'src/spotify/spotify.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ArtistCacheService } from 'src/cache/artist-cache.service';

@Module({
  imports: [HttpModule, PrismaModule],
  controllers: [ArtistController],
  providers: [ArtistService, SpotifyService, ArtistCacheService],
})
export class ArtistModule {}
