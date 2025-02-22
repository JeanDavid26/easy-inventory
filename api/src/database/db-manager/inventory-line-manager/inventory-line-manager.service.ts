import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { InventoryLine } from 'src/database/entities/InventoryLine.entity'
import { DeleteResult, Repository } from 'typeorm'

@Injectable()
export class InventoryLineManagerService {
  constructor (
    @InjectRepository(InventoryLine) private _repo: Repository<InventoryLine>,
  ) {}

  public async listByInventoryId (inventoryId: number): Promise<InventoryLine[]> {
    return this._repo.find({
      where: {
        inventoryId
      },
      relations : [ 'oArticle', 'oArticle.oCategory' ]
    })
  }

  public async get (id: number): Promise<InventoryLine> {
    return this._repo.findOne({
      where: {
        id
      }
    })
  }

  public async getByInventoryIdAndArticleId (inventoryId : number, articleId : number) : Promise<InventoryLine> {
    return this._repo.findOne({
      where : {
        articleId,
        inventoryId
      }
    })
  }

  public async insert (data: Partial<InventoryLine>): Promise<InventoryLine> {
    return this._repo.save(data)
  }

  public async update (
    id: number,
    data: Partial<InventoryLine>,
  ): Promise<InventoryLine> {
    delete data.id
    data.id = id
    return this._repo.save(data)
  }

  public async hardDelete (id: number) : Promise<DeleteResult> {
    await this.get(id)
    return this._repo.delete(id)
  }

  public async delete (id: number): Promise<InventoryLine> {
    await this.get(id)
    const stock: Partial<InventoryLine> = {
      id,
      deleteDate: new Date()
    }
    return this._repo.save(stock)
  }

  public async updateInventoryLine (articleId : number, quantity : number) : Promise<InventoryLine> {
    const oInventoryLine = await this._repo.findOne({
      where : {
        articleId
      }
    })
    if (!oInventoryLine) {
      throw new BadRequestException('Stock de quantité pour un article non trouvé')
    }
    if (oInventoryLine.quantity - quantity < 0) {
      throw new BadRequestException('Quantité inférieur à zéro')
    }
    
    return this._repo.save({
      id : oInventoryLine.id,
      quantity : oInventoryLine.quantity - quantity
    })
  }
}
