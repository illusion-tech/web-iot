import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('getProperties')
  getData() {
    // const topic = '/sys/hympO86IcSD/hw507/thing/event/property/post';
    // TODO 参数获取
    return this.appService.getDeviceProperties('hympO86IcSD', 'hw507', ['temperature', 'Humidity']);
  }
}
