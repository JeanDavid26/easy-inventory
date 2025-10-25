import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DatabaseManagerOptions } from 'src/database/@models/database-manager-options'
import { DatabaseManager } from 'src/database/class/database-manager'
import { MovementType } from 'src/database/entities/MovementType.entity'
import { Repository } from 'typeorm'

@Injectable()
export class MovementTypeManagerService extends DatabaseManager<MovementType> {
  constructor (
    @InjectRepository(MovementType)
    private _repo: Repository<MovementType>,
  ) {
    super(_repo)
  }

  public async list ({ options = {} }: { options?: DatabaseManagerOptions }): Promise<MovementType[]> {
    const repo = this._getRepo(options)
    return repo.find()
  }

  public async get ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<MovementType> {
    const repo = this._getRepo(options)
    return repo.findOne({
      where: {
        id
      }
    })
  }

  public async insert ({ data, options = {} }: { data: Partial<MovementType>, options?: DatabaseManagerOptions }): Promise<MovementType> {
    const repo = this._getRepo(options)
    return repo.save(data)
  }

  public async update ({ id, data, options = {} }: { id: number, data: Partial<MovementType>, options?: DatabaseManagerOptions }): Promise<MovementType> {
    const repo = this._getRepo(options)
    delete data.id
    data.id = id
    return repo.save(data)
  }

  public async delete ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<void> {
    const repo = this._getRepo(options)
    await this.get({ id, options })
    await repo.delete(id)
  }
}
