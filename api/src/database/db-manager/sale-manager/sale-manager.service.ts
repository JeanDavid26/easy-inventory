import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from 'src/database/entities/Sale.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SaleManagerService {
  constructor(@InjectRepository(Sale) private _repo: Repository<Sale>) {}

  public async get(id: number): Promise<Sale> {
    return this._repo.findOne({
      where: {
        id,
      },
    });
  }

  public async insert(data: Partial<Sale>): Promise<Sale> {
    return this._repo.save(data);
  }

  public async update(id: number, data: Partial<Sale>): Promise<Sale> {
    delete data.id;
    data.id = id;
    return this._repo.save(data);
  }

  public async delete(id: number): Promise<Sale> {
    await this.get(id);
    const stock: Partial<Sale> = {
      id,
      deleteDate: new Date(),
    };
    return this._repo.save(stock);
  }
}
