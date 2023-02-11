import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ArtistsModule } from './artist/artists.module';
import { SpotifyService } from './spotify/spotify.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from './prisma/prisma.module';
import { ArtistsCacheService as ArtistsCacheService } from './cache/artists-cache.service';
import { ArtistsService } from './artist/artists.service';

@Module({
  imports: [ArtistsModule, HttpModule, PrismaModule],
  controllers: [AppController],
  providers: [SpotifyService, ArtistsCacheService, ArtistsService],
})
export class AppModule {}
