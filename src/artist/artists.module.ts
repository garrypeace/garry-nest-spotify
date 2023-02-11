import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { SpotifyService } from 'src/spotify/spotify.service';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ArtistsCacheService } from 'src/cache/artists-cache.service';

@Module({
  imports: [HttpModule, PrismaModule],
  controllers: [ArtistsController],
  providers: [ArtistsService, SpotifyService, ArtistsCacheService],
})
export class ArtistsModule {}
