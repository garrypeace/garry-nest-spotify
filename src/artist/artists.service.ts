import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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
    const productsCount = await this.prisma.artist.count();
    const skip = Math.floor(Math.random() * productsCount);
    return await this.prisma.artist.findMany({
      take: 1,
      skip: skip,
      orderBy: {
        id: 'desc',
      },
    });
  }

  findAll() {
    return this.prisma.artist.findMany();
  }

  update(id: number, updateArtistDto: UpdateArtistDto) {
    return `This action updates a #${id} artist`;
  }

  remove(id: number) {
    return `This action removes a #${id} artist`;
  }
}
