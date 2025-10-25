import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DatabaseManagerOptions } from 'src/database/@models/database-manager-options'
import { DatabaseManager } from 'src/database/class/database-manager'
import { MovementLine } from 'src/database/entities/MovementLine.entity'
import { Repository } from 'typeorm'

@Injectable()
export class MovementLineManagerService extends DatabaseManager<MovementLine> {
  constructor (
    @InjectRepository(MovementLine) private _repo: Repository<MovementLine>,
  ) {
    super(_repo)
  }

  public async get ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<MovementLine> {
    const repo = this._getRepo(options)
    return repo.findOne({
      where: {
        id
      }
    })
  }

  public async insert ({ data, options = {} }: { data: Partial<MovementLine>, options?: DatabaseManagerOptions }): Promise<MovementLine> {
    const repo = this._getRepo(options)
    return repo.save(data)
  }

  public async update ({ id, data, options = {} }: { id: number, data: Partial<MovementLine>, options?: DatabaseManagerOptions }): Promise<MovementLine> {
    const repo = this._getRepo(options)
    delete data.id
    data.id = id
    return repo.save(data)
  }

  public async delete ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<MovementLine> {
    const repo = this._getRepo(options)
    await this.get({ id, options })
    const stock: Partial<MovementLine> = {
      id,
      deleteDate: new Date()
    }
    return repo.save(stock)
  }
}
