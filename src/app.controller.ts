import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return '{"readme":"https://github.com/garrypeace/garry-nest-spotify#readme"}';
  }
}
