import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { SpotifyService } from './spotify/spotify.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ArtistModule, HttpModule],
  controllers: [AppController],
  providers: [AppService, SpotifyService],
})
export class AppModule {}
