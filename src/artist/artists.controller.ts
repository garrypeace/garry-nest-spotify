import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsCacheInterceptor } from 'src/cache/artists-cache.interceptor';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ArtistEntity } from './entities/artist.entity';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception/prisma-client-exception.filter';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { CreateArtistDto } from './dto/create-artist.dto';

@UseFilters(PrismaClientExceptionFilter)
@Controller('artists')
@ApiTags('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @ApiCreatedResponse({ type: ArtistEntity })
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get('random') // this method has to be above findOne() because of the param matching
  @ApiOkResponse({ type: ArtistEntity })
  findRandom() {
    return this.artistsService.findRandom();
  }

  @Get(':id')
  @ApiOkResponse({ type: ArtistEntity })
  @ApiBadRequestResponse()
  @UseInterceptors(ArtistsCacheInterceptor)
  async findOne(@Param('id') id: string) {
    const article = await this.artistsService.findOne(id);

    if (!article) {
      throw new NotFoundException(`Could not find artist with ${id}.`);
    }

    return article;
  }

  @Get()
  @ApiOkResponse({ type: ArtistEntity, isArray: true })
  @ApiQuery({
    name: 'sort',
    required: false,
    enum: ['followers', 'popularity'], // TODO: use Typescript Omit utility type?
  })
  @ApiQuery({ name: 'direction', required: false, enum: ['asc', 'desc'] })
  findAll(@Query() query) {
    return this.artistsService.findAll(query);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ArtistEntity })
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ArtistEntity })
  remove(@Param('id') id: string) {
    return this.artistsService.remove(id);
  }
}
