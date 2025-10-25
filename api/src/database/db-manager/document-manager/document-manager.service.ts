import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DatabaseManagerOptions } from 'src/database/@models/database-manager-options'
import { DatabaseManager } from 'src/database/class/database-manager'
import { Document } from 'src/database/entities/Document.entity'
import { Repository } from 'typeorm'

@Injectable()
export class DocumentManagerService extends DatabaseManager<Document> {
  constructor (
    @InjectRepository(Document) private _repo: Repository<Document>,
  ) {
    super(_repo)
  }

  public async get ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<Document> {
    const repo = this._getRepo(options)
    const document = await repo.findOne({
      where: {
        id
      },
      relations : [ 'oAppFile' ]
    })

    if (!document) {
      throw new NotFoundException()
    }
    return document
  }

  public async list ({ options = {} }: { options?: DatabaseManagerOptions }): Promise<Document[]> {
    const repo = this._getRepo(options)
    return repo.find({})
  }

  public async insert ({ data, options = {} }: { data: Partial<Document>, options?: DatabaseManagerOptions }): Promise<Document> {
    const repo = this._getRepo(options)
    const reference = repo.create(data)
    return repo.save(reference)
  }

  public async update ({ id, data, options = {} }: { id: number, data: Partial<Document>, options?: DatabaseManagerOptions }): Promise<Document> {
    const repo = this._getRepo(options)
    delete data.id
    data.id = id
    const document = repo.create(data)
    const documentSaved = await repo.save(document)
    return documentSaved
  }

  public async softDelete ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<Document> {
    const repo = this._getRepo(options)
    await this.get({ id, options })
    return repo.save({
      id,
      deleteDate: new Date()
    })
  }

  public async findByInventoryId ({ inventoryId, options = {} }:{inventoryId: string, options?: DatabaseManagerOptions}): Promise<Document[]> {
    const repo = this._getRepo(options)
    return repo.find({
      where: {
        inventoryId: Number(inventoryId)
      },
      relations : [ 'oAppFile' ]
    })
  }
}
