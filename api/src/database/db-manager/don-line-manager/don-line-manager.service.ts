import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DatabaseManagerOptions } from 'src/database/@models/database-manager-options'
import { DatabaseManager } from 'src/database/class/database-manager'
import { DonLine } from 'src/database/entities/DonLine.entity'
import { Repository } from 'typeorm'

@Injectable()
export class DonLineManagerService extends DatabaseManager<DonLine> {
  constructor (
    @InjectRepository(DonLine) private _repo: Repository<DonLine>,
  ) {
    super(_repo)
  }

  public async insert ({ data, options = {} }: { data: Partial<DonLine>, options?: DatabaseManagerOptions }): Promise<DonLine> {
    const repo = this._getRepo(options)
    return repo.save(data)
  }
}
