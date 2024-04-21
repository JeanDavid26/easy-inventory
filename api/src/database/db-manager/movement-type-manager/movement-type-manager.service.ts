import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MovementType } from 'src/database/entities/MovementType.entity'
import { Repository } from 'typeorm'

@Injectable()
export class MovementTypeManagerService {

  constructor (
    @InjectRepository(MovementType)
    private _repo: Repository<MovementType>,
  ) {}

  public async list (): Promise<MovementType[]> {
    return this._repo.find()
  }

  public async get (id: number): Promise<MovementType> {
    return this._repo.findOne({
      where: {
        id
      }
    })
  }

  public async insert (data: Partial<MovementType>): Promise<MovementType> {
    return this._repo.save(data)
  }

  public async update (
    id: number,
    data: Partial<MovementType>,
  ): Promise<MovementType> {
    delete data.id
    data.id = id
    return this._repo.save(data)
  }

  public async delete (id: number): Promise<void> {
    await this.get(id)
   
    await this._repo.delete(id)
  }
}
