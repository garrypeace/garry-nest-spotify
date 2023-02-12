import { Module } from '@nestjs/common';
import { ArtistsCacheService } from './artists-cache.service';
import { ArtistsModule } from 'src/artist/artists.module';

@Module({
  imports: [ArtistsModule],
  exports: [ArtistsCacheService],
})
export class CacheModule {}
