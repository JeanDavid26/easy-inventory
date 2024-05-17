import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MovementLine } from 'src/database/entities/MovementLine.entity'
import { Repository } from 'typeorm'

@Injectable()
export class MovementLineManagerService {
  constructor (
    @InjectRepository(MovementLine) private _repo: Repository<MovementLine>,
  ) {}

  public async get (id: number): Promise<MovementLine> {
    return this._repo.findOne({
      where: {
        id
      }
    })
  }

  public async insert (data: Partial<MovementLine>): Promise<MovementLine> {
    return this._repo.save(data)
  }

  public async update (
    id: number,
    data: Partial<MovementLine>,
  ): Promise<MovementLine> {
    delete data.id
    data.id = id
    return this._repo.save(data)
  }

  public async delete (id: number): Promise<MovementLine> {
    await this.get(id)
    const stock: Partial<MovementLine> = {
      id,
      deleteDate: new Date()
    }
    return this._repo.save(stock)
  }
}
