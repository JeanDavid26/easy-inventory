import { Module } from '@nestjs/common'
import { AdministrationController } from './administration.controller'
import { SharedModule } from 'src/shared/shared.module'

@Module({
  controllers: [ AdministrationController ],
  imports : [ SharedModule ]
})
export class AdministrationModule {}
