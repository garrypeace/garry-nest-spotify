import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ArtistsModule } from './artist/artists.module';
import { HttpModule } from '@nestjs/axios';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [ArtistsModule, HttpModule, PrismaModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
