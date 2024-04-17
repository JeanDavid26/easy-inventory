import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleLine } from 'src/database/entities/SaleLine.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SaleLineManagerService {
  constructor(
    @InjectRepository(SaleLine) private _repo: Repository<SaleLine>,
  ) {}

  public async get(id: number): Promise<SaleLine> {
    return this._repo.findOne({
      where: {
        id,
      },
    });
  }

  public async insert(data: Partial<SaleLine>): Promise<SaleLine> {
    return this._repo.save(data);
  }

  public async update(id: number, data: Partial<SaleLine>): Promise<SaleLine> {
    delete data.id;
    data.id = id;
    return this._repo.save(data);
  }

  public async delete(id: number): Promise<SaleLine> {
    await this.get(id);
    const stock: Partial<SaleLine> = {
      id,
      deleteDate: new Date(),
    };
    return this._repo.save(stock);
  }
}
