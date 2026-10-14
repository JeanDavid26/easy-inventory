import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DatabaseManagerOptions } from 'src/database/@models/database-manager-options'
import { DatabaseManager } from 'src/database/class/database-manager'
import { SaleLine } from 'src/database/entities/SaleLine.entity'
import { Repository, SelectQueryBuilder } from 'typeorm'

@Injectable()
export class SaleLineManagerService extends DatabaseManager<SaleLine> {
  constructor (
    @InjectRepository(SaleLine) private _repo: Repository<SaleLine>,
  ) {
    super(_repo)
  }

  public async get ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<SaleLine> {
    const repo = this._getRepo(options)
    return repo.findOne({
      where: {
        id
      }
    })
  }

  public async insert ({ data, options = {} }: { data: Partial<SaleLine>, options?: DatabaseManagerOptions }): Promise<SaleLine> {
    const repo = this._getRepo(options)
    return repo.save(data)
  }

  public async update ({ id, data, options = {} }: { id: number, data: Partial<SaleLine>, options?: DatabaseManagerOptions }): Promise<SaleLine> {
    const repo = this._getRepo(options)
    delete data.id
    data.id = id
    return repo.save(data)
  }

  public async delete ({ id, options = {} }: { id: number, options?: DatabaseManagerOptions }): Promise<SaleLine> {
    const repo = this._getRepo(options)
    await this.get({ id, options })
    const stock: Partial<SaleLine> = {
      id,
      deleteDate: new Date()
    }
    return repo.save(stock)
  }

  public async getBestSellers ({ from, to, limit = 10, options = {} }: { from?: Date, to?: Date, limit?: number, options?: DatabaseManagerOptions }): Promise<{ articleId: number, label: string, referenceCode: string, quantity: number }[]> {
    const rows = await this._statsQuery({ from, to, options })
      .select('article.id', 'articleId')
      .addSelect('article.label', 'label')
      .addSelect('article.referenceCode', 'referenceCode')
      .addSelect('SUM(saleLine.quantity)', 'quantity')
      .groupBy('article.id')
      .addGroupBy('article.label')
      .addGroupBy('article.referenceCode')
      .orderBy('SUM(saleLine.quantity)', 'DESC')
      .limit(limit)
      .getRawMany()
    return rows.map(row => ({ articleId: Number(row.articleId), label: row.label, referenceCode: row.referenceCode, quantity: Number(row.quantity) }))
  }

  public async getQuantityByCategory ({ from, to, options = {} }: { from?: Date, to?: Date, options?: DatabaseManagerOptions }): Promise<{ categoryId: number, label: string, quantity: number }[]> {
    const rows = await this._statsQuery({ from, to, options })
      .leftJoin('article.oCategory', 'category')
      .select('category.id', 'categoryId')
      .addSelect('category.label', 'label')
      .addSelect('SUM(saleLine.quantity)', 'quantity')
      .groupBy('category.id')
      .addGroupBy('category.label')
      .orderBy('SUM(saleLine.quantity)', 'DESC')
      .getRawMany()
    return rows.map(row => ({ categoryId: row.categoryId ? Number(row.categoryId) : null, label: row.label ?? 'Sans catégorie', quantity: Number(row.quantity) }))
  }

  // Ventes d'un stock sur une période, regroupées par article (relevé des dépôts)
  public async getSalesByInventory ({ inventoryId, from, to, options = {} }: { inventoryId: number, from?: Date, to?: Date, options?: DatabaseManagerOptions }): Promise<InventorySaleLine[]> {
    const rows = await this._statsQuery({ from, to, options })
      .andWhere('saleLine.inventoryId = :inventoryId', { inventoryId })
      .select('article.id', 'articleId')
      .addSelect('article.referenceCode', 'referenceCode')
      .addSelect('article.label', 'label')
      .addSelect('article.unitPrice', 'unitPrice')
      .addSelect('SUM(saleLine.quantity)', 'quantity')
      .addSelect('SUM(saleLine.salePrice)', 'amount')
      .groupBy('article.id')
      .addGroupBy('article.referenceCode')
      .addGroupBy('article.label')
      .addGroupBy('article.unitPrice')
      .orderBy('article.referenceCode', 'ASC')
      .getRawMany()
    return rows.map(row => ({
      articleId: Number(row.articleId),
      referenceCode: row.referenceCode,
      label: row.label,
      unitPrice: Number(row.unitPrice),
      quantity: Number(row.quantity),
      amount: Number(row.amount)
    }))
  }

  // Lignes de vente prises en compte dans les statistiques : sessions ouvertes ou clôturées, impayés inclus,
  // en excluant tout ce qui est supprimé (session, vente, ligne). Les articles et catégories supprimés depuis
  // restent comptés car leurs ventes ont bien eu lieu. La période porte sur la date de la session.
  private _statsQuery ({ from, to, options }: { from?: Date, to?: Date, options?: DatabaseManagerOptions }): SelectQueryBuilder<SaleLine> {
    const qb = this._getRepo(options)
      .createQueryBuilder('saleLine')
      .withDeleted()
      .innerJoin('saleLine.oSale', 'sale')
      .innerJoin('sale.oSaleSession', 'saleSession')
      .innerJoin('saleLine.oArticle', 'article')
      .where('saleLine.deleteDate IS NULL')
      .andWhere('sale.deleteDate IS NULL')
      .andWhere('saleSession.deleteDate IS NULL')

    if (from) {
      qb.andWhere('saleSession.creationDate >= :from', { from })
    }
    if (to) {
      qb.andWhere('saleSession.creationDate <= :to', { to })
    }
    return qb
  }
}

export type InventorySaleLine = {
  articleId: number
  referenceCode: string
  label: string
  unitPrice: number
  quantity: number
  // Montant réellement encaissé (remises déduites)
  amount: number
}
