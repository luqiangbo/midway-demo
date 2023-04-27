import { Controller, Get } from '@midwayjs/core';

@Controller('/')
export class HomeController {
  @Get('/pop')
  async home(): Promise<string> {
    return 'pop!';
  }
}
