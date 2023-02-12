import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Artist } from '@prisma/client';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  create(createArtistDto: CreateArtistDto) {
    return this.prisma.artist.create({ data: createArtistDto });
  }

  findOne(id: string) {
    return this.prisma.artist.findUnique({ where: { id } });
  }

  async findRandom() {
    const count = await this.prisma.artist.count();
    const skip = Math.floor(Math.random() * count);
    return await this.prisma.artist.findMany({
      take: 1,
      skip: skip,
      orderBy: {
        id: 'desc',
      },
    });
  }

  async findAll(query: { sort: string; direction: 'asc' | 'desc' }) {
    // TODO: I want to type this enum but ran into some issues with providers
    // TODO: use Prisma's sorting?
    const result = await this.prisma.artist.findMany();

    if (query.sort && query.direction) {
      result.sort((a: Artist, b: Artist) => {
        const multiplier = query.direction === 'asc' ? 1 : -1;

        if (a[query.sort] > b[query.sort]) {
          return 1 * multiplier;
        }
        if (a[query.sort] < b[query.sort]) {
          return -1 * multiplier;
        }
        return 0;
      });
    }

    return result;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.prisma.artist.update({
      where: { id },
      data: updateArtistDto,
    });
  }

  remove(id: string) {
    return this.prisma.artist.delete({ where: { id } });
  }
}
