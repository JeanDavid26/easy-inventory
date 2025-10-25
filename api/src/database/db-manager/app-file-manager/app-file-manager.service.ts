import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DatabaseManagerOptions } from 'src/database/@models/database-manager-options'
import { DatabaseManager } from 'src/database/class/database-manager'
import { AppFile } from 'src/database/entities/AppFile.entity'
import { Repository } from 'typeorm'

@Injectable()
export class AppFileManagerService extends DatabaseManager<AppFile> {
  constructor (@InjectRepository(AppFile) private _repo: Repository<AppFile>) {
    super(_repo)
  }

  public async get ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<AppFile> {
    const repo = this._getRepo(options)
    const appFile = await repo.findOne({
      where: {
        id
      }
    })

    if (!appFile) {
      throw new NotFoundException()
    }
    return appFile
  }

  public async list ({ options = {} }: { options?: DatabaseManagerOptions }): Promise<AppFile[]> {
    const repo = this._getRepo(options)
    return repo.find({})
  }

  public async insert ({ data, options = {} }: { data: Partial<AppFile>, options?: DatabaseManagerOptions }): Promise<AppFile> {
    const repo = this._getRepo(options)
    const reference = repo.create(data)
    return repo.save(reference)
  }

  public async update ({ id, data, options = {} }: { id: number, data: Partial<AppFile>, options?: DatabaseManagerOptions }): Promise<AppFile> {
    const repo = this._getRepo(options)
    delete data.id
    data.id = id
    const appFile = repo.create(data)
    const appFileSaved = await repo.save(appFile)
    return appFileSaved
  }

  public async softDelete ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<AppFile> {
    const repo = this._getRepo(options)
    await this.get({ id, options })
    return repo.save({
      id,
      deleteDate: new Date()
    })
  }
}
