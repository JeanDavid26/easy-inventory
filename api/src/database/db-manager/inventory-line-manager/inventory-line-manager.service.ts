import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DatabaseManagerOptions } from 'src/database/@models/database-manager-options'
import { DatabaseManager } from 'src/database/class/database-manager'
import { InventoryLine } from 'src/database/entities/InventoryLine.entity'
import { DeleteResult, Repository } from 'typeorm'

@Injectable()
export class InventoryLineManagerService extends DatabaseManager<InventoryLine> {
  constructor (
    @InjectRepository(InventoryLine) private _repo: Repository<InventoryLine>,
  ) {
    super(_repo)
  }  

  public async listByInventoryId ({ inventoryId, options = {} }: { inventoryId: number, options?: DatabaseManagerOptions }): Promise<InventoryLine[]> {
    const repo = this._getRepo(options)
    return repo.find({
      where: {
        inventoryId
      },
      relations : [ 'oArticle', 'oArticle.oCategory' ]
    })
  }

  public async get ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<InventoryLine> {
    const repo = this._getRepo(options)
    return repo.findOne({
      where: {
        id
      }
    })
  }

  public async getByInventoryIdAndArticleId ({ inventoryId, articleId, options = {} }: { inventoryId: number, articleId: number, options?: DatabaseManagerOptions }): Promise<InventoryLine> {
    const repo = this._getRepo(options)
    return repo.findOne({
      where : {
        articleId,
        inventoryId
      }
    })
  }

  public async deleteByArticleId ({ articleId, options = {} }: { articleId: number, options?: DatabaseManagerOptions }): Promise<DeleteResult> {
    const repo = this._getRepo(options)
    return repo.delete({ articleId })
  }

  public async insert ({ data, options = {} }: { data: Partial<InventoryLine>, options?: DatabaseManagerOptions }): Promise<InventoryLine> {
    const repo = this._getRepo(options)
    return repo.save(data)
  }

  public async update ({ id, data, options = {} }: { id: number, data: Partial<InventoryLine>, options?: DatabaseManagerOptions }): Promise<InventoryLine> {
    const repo = this._getRepo(options)
    delete data.id
    data.id = id
    return repo.save(data)
  }

  public async hardDelete ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<DeleteResult> {
    const repo = this._getRepo(options)
    await this.get({ id, options })
    return repo.delete(id)
  }

  public async delete ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<InventoryLine> {
    const repo = this._getRepo(options)
    await this.get({ id, options })
    const stock: Partial<InventoryLine> = {
      id,
      deleteDate: new Date()
    }
    return repo.save(stock)
  }

  public async updateInventoryLine ({ articleId, quantity, isAdding = false, options = {} }: {articleId: number, quantity: number, isAdding?: boolean, options?: DatabaseManagerOptions }) : Promise<InventoryLine> {
    const repo = this._getRepo(options)
    const oInventoryLine = await repo.findOne({
      where : {
        articleId
      }
    })

    if (!oInventoryLine) {
      throw new BadRequestException('Stock de quantité pour un article non trouvé')
    }
    
    if (isAdding) {
      return repo.save({
        id : oInventoryLine.id,
        quantity : oInventoryLine.quantity + quantity
      })
    }

    if (oInventoryLine.quantity - quantity < 0) {
      throw new BadRequestException('Quantité inférieur à zéro')
    }
     
    return repo.save({
      id : oInventoryLine.id,
      quantity : oInventoryLine.quantity - quantity
    })
  }

  public async updateInventoryLineById ({ id, quantity, options = {} }: { id: number, quantity: number, options?: DatabaseManagerOptions }): Promise<InventoryLine> {
    const repo = this._getRepo(options)
    const oInventoryLine = await repo.findOne({
      where : {
        id
      }
    })
    if (!oInventoryLine) {
      throw new BadRequestException('Stock de quantité pour un article non trouvé')
    }
    if (quantity < 0) {
      throw new BadRequestException('Quantité inférieur à zéro')
    }
    
    return repo.save({
      id,
      quantity : quantity
    })
  }
}
