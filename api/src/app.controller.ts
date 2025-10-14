import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly _appService: AppService) { }
  // TODO: tets todo comment 
  // FIXME test 2.0
  @Get()
  getHello(): string {
    return this._appService.getHello()
  }
}
