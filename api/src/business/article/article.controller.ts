import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query
} from '@nestjs/common'
import { ArticleManagerService } from 'src/database/db-manager/article-manager/article-manager.service'
import { Article } from 'src/database/entities/Article.entity'
import { UpsertArticleDto } from './dto/upsert-article.dto'
import { InventoryLineManagerService } from 'src/database/db-manager/inventory-line-manager/inventory-line-manager.service'

@Controller('article')
export class ArticleController {
  constructor (private _articleManagerService: ArticleManagerService, private _inventoryLineManagerService : InventoryLineManagerService) {}

  @Get()
  public list (@Query() queryParam : string): Promise<Article[]> {
    let tRelation = []
    const tRelationQuery = queryParam['tRelation'] ?? null
    if (tRelationQuery && tRelationQuery.match(',')) {
      tRelation = tRelationQuery.split(',')
    } else if (tRelationQuery) {
      tRelation = [ tRelationQuery ]
    }

    const bFilterStorableQuery = queryParam['bFilterStorable'] ?? null

    let bFilterStorable = false
    if (bFilterStorableQuery && bFilterStorableQuery === 'true') {
      bFilterStorable = true
    }
    return this._articleManagerService.list(tRelation, bFilterStorable)
  }

  @Get(':id')
  public get (@Param('id') id: number): Promise<Article> {
    id = Number(id)
    return this._articleManagerService.get(id)
  }

  @Post()
  public insert (@Body() data: UpsertArticleDto): Promise<Article> {
    return this._articleManagerService.insert(data)
  }

  @Put(':id')
  public update (
    @Param('id') id: number,
    @Body() data: UpsertArticleDto,
  ): Promise<Article> {
    id = Number(id)
    return this._articleManagerService.update(id, data)
  }

  @Delete(':id')
  public async softDelete (@Param('id') id: number): Promise<Article> {
    id = Number(id)
    await this._inventoryLineManagerService.deleteByArticleId(id)
    return this._articleManagerService.softDelete(id)
  }
}
