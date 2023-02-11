import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ArtistModule } from './artist/artist.module';
import { SpotifyService } from './spotify/spotify.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from './prisma/prisma.module';
import { ArtistCacheService } from './cache/artist-cache.service';
import { ArtistService } from './artist/artist.service';

@Module({
  imports: [ArtistModule, HttpModule, PrismaModule],
  controllers: [AppController],
  providers: [SpotifyService, ArtistCacheService, ArtistService],
})
export class AppModule {}
