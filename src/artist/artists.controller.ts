import {
  Controller,
  Get,
  Param,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsCacheInterceptor } from 'src/cache/artists-cache.interceptor';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArtistEntity } from './entities/artist.entity';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception/prisma-client-exception.filter';

@UseFilters(PrismaClientExceptionFilter)
@Controller('artists')
@ApiTags('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  // this has to be above the findOne
  @Get('random')
  @ApiOkResponse({ type: ArtistEntity })
  findRandom() {
    return this.artistsService.findRandom();
  }

  @Get(':id')
  @ApiOkResponse({ type: ArtistEntity })
  @ApiBadRequestResponse()
  @UseInterceptors(ArtistsCacheInterceptor)
  findOne(@Param('id') id: string) {
    return this.artistsService.findOne(id);
  }

  @Get()
  @ApiOkResponse({ type: ArtistEntity, isArray: true })
  findAll() {
    return this.artistsService.findAll();
  }
}
