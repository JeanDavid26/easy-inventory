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

@Controller('article')
export class ArticleController {
  constructor (private _articleManagerService: ArticleManagerService) {}

  @Get()
  public list (@Query('tRelation') tRelationQuery : string): Promise<Article[]> {
    let tRelation = []
    if (tRelationQuery && tRelationQuery.match(',')) {
      tRelation = tRelationQuery.split(',')
    } else if (tRelationQuery) {
      tRelation = [ tRelationQuery ]
    }
    return this._articleManagerService.list(tRelation)
  }

  @Get(':id')
  public get (@Param('id') id: number): Promise<Article> {
    id = Number(id)
    return this._articleManagerService.get(id)
  }

  @Post()
  public ajouter (@Body() data: UpsertArticleDto): Promise<Article> {
    return this._articleManagerService.insert(data)
  }

  @Put(':id')
  public modifier (
    @Param('id') id: number,
    @Body() data: UpsertArticleDto,
  ): Promise<Article> {
    id = Number(id)
    return this._articleManagerService.update(id, data)
  }

  @Delete(':id')
  public softDelete (@Param('id') id: number): Promise<Article> {
    id = Number(id)
    return this._articleManagerService.softDelete(id)
  }
}
